import React, { StrictMode } from "react";

import "./style.css";

import { PageRootSectionHead } from "./page/root/section/head";
import { PageRootSectionContent } from "./page/root/section/content";
import { PageRootSectionFooter } from "./page/root/section/footer";

export const Root = () => (
  <StrictMode>
    <div className="flex flex-col gap-y-2 min-h-full pb-4">
      <PageRootSectionHead />
      <PageRootSectionContent />
      <PageRootSectionFooter />
    </div>
  </StrictMode>
);
