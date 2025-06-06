import esbuild from "esbuild";

import { config } from "./build.config";

(async () => {
  await esbuild.build({
    ...config,
    platform: "node",
    entryPoints: {
      index: "src/prerender.tsx",
    },
    outExtension: {
      ".js": ".cjs",
    },
    outdir: "out/prerender",
    packages: "external",
  });

  await esbuild.build({
    ...config,
    outdir: "out/csr",
    minify: true,
    define: {
      HYDRATE: "true",
      "process.env.NODE_ENV": '"production"',
    },
  });
})();
