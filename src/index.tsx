import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { Root } from "./root";

const domNode = document.getElementById("root")!;

if (!HYDRATE) {
  const root = createRoot(domNode);
  root.render(<Root />);
} else {
  hydrateRoot(domNode, <Root />);
}
