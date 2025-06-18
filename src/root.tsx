import React, { StrictMode } from "react";

import "./style.css";

import { PageRootSectionHead } from "./page/root/section/head";
import { PageRootSectionContent } from "./page/root/section/content";

export const Root = () => (
  <StrictMode>
    <div className="flex flex-col gap-y-1 min-h-full pb-4">
      <PageRootSectionHead />
      <PageRootSectionContent />
    </div>
  </StrictMode>
);
