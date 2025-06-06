import React from "react";

import MastodonSymbol from "inline:social/mastodon.svg";
import PixelfedSymbol from "inline:social/pixelfed.svg";
import EqSymbol from "inline:social/eq.svg";
import GitHubSymbol from "inline:social/github.svg";

export const PageRootSectionFooter = () => {
  return (
    <div className="w-full">
      <div className="max-w-3xl mx-4 md:mx-auto">
        <div className="flex flex-col justify-end gap-y-1">
          <a className="group w-fit" href="https://mastodon.social/@philiptrauner">
            <span className="flex flex-row gap-x-2 items-center w-fit">
              <img
                className="w-5 dark:invert group-hover:invert-25 dark:group-hover:invert-75 transition-all"
                src={MastodonSymbol}
                alt="Mastodon"
              ></img>
              <span className="text-xs font-stretch-semi-expanded group-hover:underline">
                @philiptrauner@mastodon.social
              </span>
            </span>
          </a>

          <a className="group w-fit" href="https://pixelfed.social/@philiptrauner">
            <span className="flex flex-row gap-x-2 items-cente w-fitr">
              <img
                className="w-5 dark:invert group-hover:invert-25 dark:group-hover:invert-75 transition-all"
                src={PixelfedSymbol}
                alt="Pixelfed"
              ></img>
              <span className="text-xs font-stretch-semi-expanded group-hover:underline">
                @philiptrauner@pixelfed.social
              </span>
            </span>
          </a>

          <a className="group w-fit" href="https://eq.fm/@philip">
            <span className="flex flex-row gap-x-2 items-center w-fit">
              <img
                className="w-5 dark:invert group-hover:invert-25 dark:group-hover:invert-75 transition-all"
                src={EqSymbol}
                alt="eq.fm"
              ></img>
              <span className="text-xs font-stretch-semi-expanded group-hover:underline">
                @philip@eq.fm
              </span>
            </span>
          </a>

          <a className="group w-fit" href="https://github.com/PhilipTrauner">
            <span className="flex flex-row gap-x-2 items-center w-fit">
              <img
                className="w-5 dark:invert group-hover:invert-25 dark:group-hover:invert-75 transition-all"
                src={GitHubSymbol}
                alt="GitHub"
              ></img>
              <span className="text-xs font-stretch-semi-expanded group-hover:underline">
                @philiptrauner@github.com
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
