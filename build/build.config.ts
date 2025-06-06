import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { BuildOptions, Plugin } from "esbuild";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { Transformer } from "@napi-rs/image";
import { imageSize } from "image-size";
import { optimize as optimizeSvg } from "svgo";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sortedReplacer = (_: string, value: unknown) =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
        .sort()
        .reduce(
          (sorted, key) => {
            sorted[key] = (value as Record<string, unknown>)[key];
            return sorted;
          },
          {} as Record<string, unknown>,
        )
    : value;

type Operations = {
  resize?: ResizeOperation;
  lossy?: boolean;
};
type ResizeOperation = {
  width: number;
  height?: number;
};

const transform = (file: Buffer, operations: Operations): Transformer => {
  let transformer = new Transformer(file);

  if (typeof operations.resize !== "undefined") {
    transformer = transformer.resize(operations.resize.width, operations.resize.height);
  }

  return transformer;
};

// https://gist.github.com/jennyknuth/222825e315d45a738ed9d6e04c7a88d0
const encodeSvg = (svgString: string) =>
  svgString
    .replace(
      "<svg",
      ~svgString.indexOf("xmlns") ? "<svg" : '<svg xmlns="http://www.w3.org/2000/svg"',
    )
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/\s+/g, " ");

const tailwindPlugin = tailwind();
const autoprefixerPlugin = autoprefixer();

const preparedPostCss = postcss([tailwindPlugin, autoprefixerPlugin]);

const postCssPlugin: Plugin = {
  name: "post-css",
  setup: (build) => {
    build.onLoad({ filter: /.*.css$/ }, async (args) => {
      const contents = await readFile(args.path);

      const processed = await preparedPostCss.process(contents, {
        from: args.path,
      });

      return {
        contents: processed.css,
        loader: "css",
      };
    });
  },
};

const convertPngName = "convert-png";
const convertPngNamespace = `${convertPngName}-namespace`;
const convertPngSizedNamespace = `${convertPngName}-sized-namespace`;
const convertPngRegex = /^(sized:)?(.+)\.png$/;

const resizeOperationRegex = /^w=(?<width>\d+)(?:&h=(?<height>\d+))?$/;

const convertPng: Plugin = {
  name: convertPngName,
  setup: (build) => {
    const cache: Map<string, Buffer> = new Map();
    build.onResolve({ filter: convertPngRegex }, async (args) => {
      const match = args.path.match(convertPngRegex)!;

      const sized = typeof match[1] !== "undefined";

      const path = match[2];

      let resizeOperation: ResizeOperation | undefined = undefined;
      resize: {
        const unmatched = args.with["resize"];
        if (typeof unmatched === "undefined") {
          break resize;
        }
        const matched = unmatched.match(resizeOperationRegex);

        if (!matched) {
          console.error("malformed resize instruction");
          break resize;
        }

        const width = matched?.groups?.["width"];
        const height = matched?.groups?.["height"];
        resizeOperation = {
          width: parseInt(width!),
          height: typeof height !== "undefined" ? parseInt(height) : undefined,
        };
      }
      let lossyOperation: boolean | undefined;
      lossy: {
        const value = args.with["lossy"];
        if (typeof value === "undefined") {
          break lossy;
        }

        switch (value) {
          case "true":
            lossyOperation = true;
            break lossy;
          case "false":
            lossyOperation = false;
            break lossy;
          default:
            console.error("malformed lossy instruction");
            break lossy;
        }
      }

      const source = join(__dirname, "..", "public", `${path}.png`);
      const file = await readFile(source);

      const destination = join(__dirname, "..", "public", `${path}.webp`);

      const operations: Operations = {
        resize: resizeOperation,
        lossy: lossyOperation,
      };

      const cacheKey = path + "|" + JSON.stringify(operations, sortedReplacer);

      return {
        path: destination,
        namespace: sized ? convertPngSizedNamespace : convertPngNamespace,
        pluginData: {
          source: `${path}.png`,
          file,
          operations,
          cacheKey,
        },
      };
    });

    build.onLoad({ filter: /.*/, namespace: convertPngNamespace }, async (args) => {
      const file = args.pluginData.file;
      const cacheKey = args.pluginData.cacheKey;
      const operations: Operations = args.pluginData.operations;

      let transformed: Buffer;
      {
        const hit = cache.get(cacheKey);
        if (typeof hit !== "undefined") {
          transformed = hit;
        } else {
          transformed = operations.lossy
            ? await transform(file, operations).webp()
            : await transform(file, operations).webpLossless();
          cache.set(cacheKey, transformed);
        }
      }

      return {
        contents: transformed,
        loader: "file",
        pluginName: convertPngName,
      };
    });

    build.onLoad({ filter: /.*$/, namespace: convertPngSizedNamespace }, async (args) => {
      const file = args.pluginData.file;
      const cacheKey = args.pluginData.cacheKey;
      const operations: Operations = args.pluginData.operations;

      const transformed = operations.lossy
        ? await transform(file, operations).webp()
        : await transform(file, operations).webpLossless();
      cache.set(cacheKey, transformed);

      const size = imageSize(transformed);

      const withStmt =
        Object.keys(args.with).length !== 0 ? ` with ${JSON.stringify(args.with)}` : "";
      const contents = `import Image from "${args.pluginData.source}"${withStmt};

export default {
  src: Image,
  width: ${size.width},
  height: ${size.height},
}
    `;

      return {
        contents,
        loader: "js",
        pluginName: convertPngName,
      };
    });
  },
};

const inlineSvgNamespace = "inline-svg-plugin-namespace";
const inlineSvgRegex = /^inline:(.+\.svg)$/;
const inlineSvg: Plugin = {
  name: "inline-svg",
  setup: (build) => {
    build.onResolve({ filter: inlineSvgRegex }, (args) => {
      const realPath = args.path.match(inlineSvgRegex)![1];

      return {
        path: join(__dirname, "..", "public", realPath),
        namespace: inlineSvgNamespace,
      };
    });

    build.onLoad({ filter: /.*/, namespace: inlineSvgNamespace }, async (args) => {
      const contents = await readFile(args.path, "utf8");

      const optimized = optimizeSvg(contents, {
        path: args.path,
        multipass: true,
      });

      return {
        contents: `data:image/svg+xml;utf8,${encodeSvg(optimized.data)}`,
        loader: "text",
      };
    });
  },
};

export const config: BuildOptions = {
  entryPoints: {
    entrypoint: "src/index.tsx",
  },
  nodePaths: ["public"],
  platform: "browser",
  target: "es6",
  bundle: true,
  plugins: [postCssPlugin, convertPng, inlineSvg],
  loader: {
    ".html": "copy",
    ".png": "file",
    ".ttf": "file",
    ".woff2": "file",
  },
  define: {
    HYDRATE: "false",
  },
};
