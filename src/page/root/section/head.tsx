import React from "react";

import { ComponentSizedImage } from "../../../component/sized-image";

import Avatar from "sized:avatar.png" with { resize: "w=128" };

export const PageRootSectionHead = () => {
  return (
    <div className="w-full bg-[#b9ff52]">
      <div className="max-w-3xl my-6 mx-4 md:mx-auto">
        <div className="flex justify-between gap-x-5 flex-col-reverse min-[480px]:flex-row gap-y-5 text-label-quaternary">
          <div className="flex justify-center flex-col gap-y-[5px]">
            <div className="flex flex-col gap-y-[2px]">
              <span className="text-3xl font-medium font-[Unbounded] text-black">
                philip trauner
              </span>
              <span className="text-sm text-neutral-700 font-stretch-semi-expanded">
                somewhere at the intersection of computers and humanities
              </span>
            </div>
            <div className="flex flex-col gap-y-3">
              <span className="text-xs text-neutral-600 font-stretch-semi-condensed">
                🇦🇹 wiener neustadt, austria
              </span>

              <div className="flex text-xs gap-x-1 flex-wrap">
                <a
                  className="underline text-neutral-600 hover:text-neutral-900"
                  href="https://philip-trauner.me"
                >
                  philip-trauner.me
                </a>
                <span className="text-black">/</span>
                <a
                  className="underline text-neutral-600 hover:text-neutral-900"
                  href="mailto:trauner.philip@gmail.com"
                >
                  trauner.philip[at]gmail.com
                </a>
              </div>
            </div>
          </div>
          <ComponentSizedImage
            className="rounded-full shadow-xl w-full h-full max-w-[128px]"
            src={Avatar}
          />
        </div>
      </div>
    </div>
  );
};
