import { parseArgs } from "node:util";
import { createWriteStream } from "node:fs";

import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { createElement } from "react";

import { Root } from "./root";

const parsed = parseArgs({
  options: {
    out: {
      type: "string",
      short: "o",
    },
  },
});

const out = parsed.values.out;
if (typeof out === "undefined") {
  console.error("missing parameter '--out'");
  process.exit(1);
}

const App = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#b9ff52" />
        <link rel="stylesheet" href="entrypoint.css" />
        <title>philip trauner — cv</title>
      </head>
      <body>
        <div id="root">
          <Root />
        </div>
      </body>
    </html>
  );
};

(async () => {
  const { prelude: contentReadable } = await prerenderToNodeStream(createElement(App), {
    bootstrapScripts: ["entrypoint.js"],
  });

  const stream = createWriteStream(out);
  contentReadable.pipe(stream);
})();
