import React, { useContext, useRef } from "react";

import clsx from "clsx";
import { HTMLProps, ReactNode, useState, useEffect } from "react";
import { createContext } from "react";

import { ComponentSizedImage } from "../../../component/sized-image";

import OrganisatonEq from "sized:organisation/eq.png" with { resize: "w=128" };
import OrganisatonLlb from "sized:organisation/llb.png" with { resize: "w=128" };
import OrganisatonHims from "sized:organisation/hims.png" with { resize: "w=128" };
import OrganisatonCybertec from "sized:organisation/cybertec.png" with { resize: "w=128" };
import OrganisatonHtl from "sized:organisation/htl.png" with { resize: "w=128" };

const Circle = (props: HTMLProps<HTMLDivElement> & { children?: ReactNode }) => {
  const { children, className, ...intrinsics } = props;
  return (
    <div className={clsx("rounded-full border-2 bg-white z-10", className)} {...intrinsics}>
      {children}
    </div>
  );
};

const VerticalLine = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...intrinsics } = props;
  return (
    <div className="flex h-full w-full justify-end">
      <div className={clsx("w-[calc(50%+1px)] border-l-2 h-full", className)} {...intrinsics}></div>
    </div>
  );
};

const ContextSelectedTag = createContext<string | undefined>(undefined);

const Tag = ({ value, children }: { value: string; children: ReactNode }) => {
  const selectedTag = useContext(ContextSelectedTag);
  return (
    <span
      className={clsx("italic font-stretch-expanded transition", {
        "bg-label text-background rounded-sm px-1": selectedTag === value,
      })}
      data-tag={value}
    >
      {children}
    </span>
  );
};

const TagSelector = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value?: string) => void;
}) => {
  const selectedTag = useContext(ContextSelectedTag);
  const selfRef = useRef<HTMLButtonElement>(null);

  const selected = value === selectedTag;

  return (
    <button
      ref={selfRef}
      className={clsx(
        "cursor-pointer bg-gray-4 rounded-full px-2 py-[2px] enabled:hover:bg-gray-5 enabled:active:bg-gray-6 enabled:active:text-label-tertiary transition-colors border-gray-2 border-1 disabled:border-label",
        { "border-label": selected },
      )}
      key={value}
      onClick={() => {
        if (selected) {
          setValue(undefined);
          return;
        }

        const nodes = document.querySelectorAll(`[data-tag="${value}"]`);
        const first = nodes.item(0);
        first?.scrollIntoView({ behavior: "smooth", block: "center" });

        setValue(value);
      }}
    >
      {value}
    </button>
  );
};

export const PageRootSectionContent = () => {
  const [sortedTags, setSortedTags] = useState<[string, number][]>();
  const [selectedTag, setSelectedTag] = useState<string>();

  useEffect(() => {
    const tagNodes = document.querySelectorAll("[data-tag]");
    const tags: Map<string, number> = new Map();
    tagNodes.forEach((node) => {
      if (!("dataset" in node)) {
        return;
      }

      if (node.dataset == null || typeof node.dataset !== "object" || !("tag" in node.dataset)) {
        return;
      }

      if (typeof node.dataset.tag !== "string") {
        return;
      }

      const tag = node.dataset.tag;
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    });

    const rearranged: [string, number][] = [];
    {
      for (const value of [
        "typescript",
        "swift",
        "swiftui",
        "figma",
        "postgres",
        "sqlite",
        "redis",
        "ansible",
        "python",
        "kubernetes",
      ]) {
        const hit = tags.get(value);
        if (typeof hit === "undefined") {
          continue;
        }

        tags.delete(value);

        rearranged.push([value, hit]);
      }
    }

    const sorted = [...(tags.entries() ?? [])].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );

    setSortedTags([...rearranged, ...sorted]);
  }, []);

  return (
    <ContextSelectedTag value={selectedTag}>
      <div className="grow w-full h-full">
        <div className="max-w-3xl my-4 mx-4 md:mx-auto">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <div className="text-xl font-medium">hi 👋</div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">
                  i've been fortunate to have played a role in many disciplines required in bringing
                  products to life.
                </p>
                <p className="text-sm">
                  this has made me a strong generalist, capable of fulfilling the needs of the
                  business, while still being a passionate advocate for the customer.
                </p>
                <p className="text-sm">
                  i'm at my best when coming up with a design, and then working backwards from it
                  layer by layer.
                </p>
                <p className="text-sm">
                  i believe computers should delight, and i look forward to working with folks that
                  share said belief ✨
                </p>
              </div>
              <div className="text-sm">
                what i'm also passionate about:{" "}
                <span className="font-stretch-condensed font-medium">#photography</span>{" "}
                <span className="font-stretch-condensed font-medium">#3d-printing</span>{" "}
                <span className="font-stretch-condensed font-medium">#music</span>{" "}
                <span className="font-stretch-condensed font-medium">#gaming</span>
              </div>
            </div>

            <hr className="border-separator-opaque" />

            <div className="flex flex-col gap-y-5">
              <div>
                <div className="grid grid-cols-[48px_1fr] grid-rows-[48px_max-content_48px_max-content]">
                  <div className="row-1 col-1 place-self-center">
                    <a className="group" href="https://eq.fm">
                      <Circle
                        className="
              relative
              border-transparent
              before:absolute
              before:bg-[linear-gradient(to_top,#7D7AFF,#70D7FF,#4CE071,#FFD426,#FFB340,#FD635B)]
              before:top-0 before:left-0 before:right-0 before:bottom-0
              before:-z-10
              before:m-[-2px]
              before:rounded-[inherit]
              before:content-['']
              group-hover:scale-110 transition-transform"
                      >
                        <ComponentSizedImage className="rounded-full" src={OrganisatonEq} />
                      </Circle>
                    </a>
                  </div>
                  <div className="row-1 col-2 self-center min-w-0">
                    <div className="flex flex-col pl-4 min-w-0">
                      <a
                        href="https://eq.fm"
                        className="font-semibold font-stretch-semi-condensed underline hover:text-label-secondary text-nowrap overflow-ellipsis overflow-hidden"
                      >
                        eq.fm
                      </a>
                      <span className="text-sm text-label-secondary text-nowrap overflow-ellipsis overflow-hidden">
                        2022—now{" "}
                        <span className="font-stretch-condensed font-light"> • founder</span>
                      </span>
                    </div>
                  </div>
                  <div className="row-2 col-2">
                    <div className="pl-4 pb-4 flex flex-col gap-y-1">
                      <div className="text-sm">companion app for music</div>
                      <ul className="list-disc [&>*:not(:last-child)]:mb-2">
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-2">
                            <div className="text-sm">product</div>
                            <div className="text-xs flex flex-col gap-y-2">
                              <p>
                                prototyping / design / asset management in{" "}
                                <Tag value="figma">Figma</Tag>
                              </p>
                              <p>
                                documentation in <Tag value="notion">Notion</Tag>
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">implementation</div>
                            <ul className="list-outside list-disc pl-3 [&>*:not(:last-child)]:mb-3">
                              <li>
                                <div className="inline-flex flex-col flex-wrap gap-y-1">
                                  <div className="text-sm">iOS client</div>
                                  <div className="flex flex-col flex-wrap gap-y-3">
                                    <div className="text-xs">
                                      <Tag value="swift">Swift</Tag> /{" "}
                                      <Tag value="swiftui">SwiftUI</Tag> app with bits of{" "}
                                      <Tag value="uikit">UIKit</Tag>
                                    </div>
                                    <div className="text-xs flex flex-col gap-y-2">
                                      <p>
                                        functionality grouped into <Tag value="swift">Swift</Tag>{" "}
                                        packages
                                      </p>
                                      <p>
                                        custom combined playback control / navigation interface with
                                        state restoration
                                      </p>
                                      <p>accent colors extracted from content</p>
                                      <p>server-driven UI</p>
                                      <p>
                                        offline data synchronisation with{" "}
                                        <Tag value="sqlite">SQLite</Tag> as database
                                      </p>
                                      <p>type-safe API request abstraction</p>
                                      <p>background tasks for app refresh</p>
                                      <p>mobile-first ux paradigms for user customization</p>
                                      <p>
                                        music playback through integration with Apple Music and{" "}
                                        Spotify player SDK
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="inline-flex flex-col flex-wrap gap-y-1">
                                  <div className="text-sm">web client</div>
                                  <div className="flex flex-col flex-wrap gap-y-3">
                                    <div className="text-xs">
                                      isomorphic progressive <Tag value="react">React</Tag> app
                                      implemented in <Tag value="typescript">TypeScript</Tag>
                                    </div>
                                    <div className="text-xs flex flex-col gap-y-2">
                                      <p>
                                        type-safe API request abstraction with the ability to
                                        fulfill requests during server-side rendering
                                      </p>
                                      <p>
                                        streaming Apple Music and Spotify play history archive
                                        parsing and uploading
                                      </p>
                                      <p>share target support</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="inline-flex flex-col flex-wrap gap-y-1">
                                  <div className="text-sm">back-end</div>
                                  <div className="flex flex-col flex-wrap gap-y-3">
                                    <div className="text-xs">
                                      <Tag value="typescript">TypeScript</Tag> /{" "}
                                      <Tag value="nodejs">NodeJS</Tag> monolith
                                    </div>
                                    <div className="text-xs flex flex-col gap-y-2">
                                      <p>
                                        type-safe <Tag value="openapi">OpenAPI</Tag>-specified HTTP
                                        API
                                      </p>
                                      <p>
                                        strategic use of streaming when delivering server-driven UI
                                        to achieve interactivity as soon as possible
                                      </p>
                                      <p>
                                        quality of service enforcement for third-party API calls
                                        with quotas
                                      </p>
                                      <p>server-side rendering of web client</p>
                                      <p>
                                        use of worker threads for computationally intinsive work
                                      </p>
                                      <p>sliding-window based push notification merging</p>
                                      <p>
                                        uses <Tag value="redis">Redis</Tag> for ephemeral data,{" "}
                                        <Tag value="postgres">PostgreSQL</Tag> for anything
                                        long-lived, <Tag value="s3">S3</Tag> for user content
                                      </p>
                                      <p>
                                        hosts <Tag value="discord">Discord</Tag> bot for interactive
                                        alerting
                                      </p>
                                      <p>
                                        <Tag value="prometheus">Prometheus</Tag> for monitoring
                                      </p>
                                      <p>
                                        in-process scheduler with support for multiple running
                                        instances
                                      </p>
                                      <p>snapshot testing of third-party API integrations</p>
                                      <p>
                                        periodically ingests <Tag value="rss">RSS</Tag> feeds for
                                        music-adjacent content
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="inline-flex flex-col flex-wrap gap-y-2">
                                  <div className="text-sm">tooling</div>
                                  <div className="text-xs flex flex-col gap-y-2">
                                    <p>
                                      MusicBrainz database <Tag value="postgres">PostgreSQL</Tag> to{" "}
                                      <Tag value="sqlite">SQLite</Tag> conversion to fit fully into
                                      working memory for substantial speedup
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-2">
                            <div>operations</div>
                            <div className="text-xs flex flex-col gap-y-2">
                              <p>
                                <Tag value="ansible">Ansible</Tag> playbooks to bootstrap
                                k3s-flavoured <Tag value="kubernetes">Kubernetes</Tag>
                              </p>

                              <p>
                                monitoring with <Tag value="grafana">Grafana</Tag> /{" "}
                                <Tag value="prometheus">Prometheus</Tag>, alerting with{" "}
                                <Tag value="alertmanager">Alertmanager</Tag>
                              </p>
                              <p>
                                backups with <Tag value="wal-g">WAL-G</Tag>
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row-2 col-1">
                    <VerticalLine className="[border-image:linear-gradient(to_bottom,#7d7aff,#153558)_1_100%] dark:[border-image:linear-gradient(to_bottom,#7d7aff,#367fce)_1_100%]" />
                  </div>
                  <div className="row-3 col-1">
                    <VerticalLine className="border-[#153558] dark:border-[#367fce]" />
                  </div>
                  <div className="row-4 col-1">
                    <VerticalLine className="border-[#153558] dark:border-[#367fce]" />
                  </div>
                  <div className="row-3 col-1 place-self-center">
                    <Circle className="w-3 h-3 border-[#153558] dark:border-[#367fce] bg-white" />
                  </div>
                  <div className="row-3 col-2 self-center min-w-0">
                    <div className="flex flex-col pl-4 min-w-0">
                      <a
                        href="https://www.cybertec-postgresql.com/en/products/cybertec-postgresql-migrator/"
                        className="font-semibold font-stretch-semi-condensed underline hover:text-label-secondary text-nowrap overflow-ellipsis overflow-hidden"
                      >
                        CYBERTEC Migrator
                      </a>
                      <span className="text-sm text-label-secondary text-nowrap overflow-ellipsis overflow-hidden">
                        2021 — 2022{" "}
                        <span className="font-stretch-condensed font-light">
                          {" "}
                          • product engineer
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="row-4 col-2">
                    <div className="pl-4 flex flex-col gap-y-1">
                      <div className="text-sm">
                        browser-based <Tag value="oracle database">Oracle Database</Tag> to{" "}
                        <Tag value="postgres">PostgreSQL</Tag> migration environment
                      </div>
                      <ul className="list-disc [&>*:not(:last-child)]:mb-2">
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">product design</div>
                            <div>
                              <div className="text-xs flex flex-col gap-y-1">
                                <div>
                                  design and prototyping in <Tag value="figma">Figma</Tag>
                                </div>
                                <div>
                                  applied well understood text editor paradigms to database
                                  migration workflows
                                </div>
                                <div>
                                  envisioned custom controls tailored towards migration processes
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">testing infrastructure</div>
                            <div>
                              <div className="text-xs">
                                reduced test harness startup speed from multiple minutes to seconds
                                on aging hardware
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">
                              <Tag value="postgres">PostgreSQL</Tag> parser integration
                            </div>
                            <div className="text-xs">
                              compiled standalone parser implementation to{" "}
                              <Tag value="webassembly">WebAssembly</Tag> to surface diagnostics in
                              code editor
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">distribution infrastructure</div>
                            <div className="text-xs">
                              implemented cross-platform bootstrapper in{" "}
                              <Tag value="bash">Bash</Tag> with support for online and offline
                              upgrades
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">front-end / back-end tasks</div>
                            <div className="text-xs">
                              implemented features in <Tag value="typescript">TypeScript</Tag>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[48px_48px_minmax(0,1fr)] grid-rows-[48px_48px_max-content_max-content_max-content_48px]">
                  <div className="row-1 col-1">
                    <div className="flex w-full h-full justify-end">
                      <div className="w-[calc(50%+1px)] h-1/2 border-l-2 border-l-[#637a52] rounded-bl-xl border-b-2 border-b-[#637a52]"></div>
                    </div>
                  </div>
                  <div className="row-start-1 row-end-7 col-1">
                    <VerticalLine className="border-[#153558] dark:border-[#367fce] z-10" />
                  </div>
                  <div className="row-1 col-2">
                    <div className="flex w-full h-full justify-start items-end">
                      <div className="w-[calc(50%+1px)] h-[calc(50%+2px)] border-r-2 border-r-[#637a52] rounded-tr-xl border-t-2 border-t-[#637a52]"></div>
                    </div>
                  </div>
                  <div className="row-2 col-2 place-self-center">
                    <a className="group" href="https://llb.li/">
                      <Circle className="border-[#637a52] group-hover:scale-110 transition-transform">
                        <ComponentSizedImage className="rounded-full" src={OrganisatonLlb} />
                      </Circle>
                    </a>
                  </div>
                  <div className="row-2 col-3 self-center min-w-0">
                    <div className="flex flex-col pl-4 min-w-0">
                      <a
                        href="https://llb.li/"
                        className="font-semibold font-stretch-semi-condensed underline hover:text-label-secondary text-nowrap overflow-ellipsis overflow-hidden"
                      >
                        Lichtensteiner Landesbank
                      </a>
                      <span className="text-sm text-label-secondary text-nowrap overflow-ellipsis overflow-hidden">
                        2020 — 2021{" "}
                        <span className="font-stretch-condensed font-light"> • consulting</span>
                      </span>
                    </div>
                  </div>
                  <div className="row-3 col-3">
                    <div className="pl-4 pb-6">
                      <ul className="list-disc [&>*:not(:last-child)]:mb-2">
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">
                              partial <Tag value="docker">Docker</Tag> reimplementation
                            </div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  built image packaging tooling in <Tag value="python">Python</Tag>,
                                  and utilized <span className="font-mono">systemd-nspawn</span> as
                                  runtime, to comply with strict compliance criteria
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">
                              data ingestion / transformation infrastructure
                            </div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  implemented rule-based data transformation engine in{" "}
                                  <Tag value="python">Python</Tag> to correct malformed data
                                  on-the-fly and import it into{" "}
                                  <Tag value="postgres">PostgreSQL</Tag> for reporting purposes
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row-3 col-2">
                    <VerticalLine className="[border-image:linear-gradient(to_bottom,#637a52,#e5dacf)_1_100%]" />
                  </div>
                  <div className="row-4 col-2 place-self-center">
                    <a className="group" href="https://www.hims.com/">
                      <Circle className="border-[#e5dacf] group-hover:scale-110 transition-transform p-1">
                        <ComponentSizedImage className="rounded-full" src={OrganisatonHims} />
                      </Circle>
                    </a>
                  </div>
                  <div className="row-4 col-3 self-center min-w-0">
                    <div className="flex flex-col pl-4 min-w-0">
                      <a
                        href="https://www.hims.com/"
                        className="font-semibold font-stretch-semi-condensed underline hover:text-label-secondary text-nowrap overflow-ellipsis overflow-hidden"
                      >
                        Hims & Hers Health, Inc.
                      </a>
                      <span className="text-sm text-label-secondary text-nowrap overflow-ellipsis overflow-hidden">
                        2018 — 2020{" "}
                        <span className="font-stretch-condensed font-light"> • consulting</span>
                      </span>
                    </div>
                  </div>
                  <div className="row-5 col-3">
                    <div className="pl-4">
                      <ul className="list-disc [&>*:not(:last-child)]:mb-2">
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">medical questionnaire builder</div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  with support for arbitratry branching, built in{" "}
                                  <Tag value="typescript">TypeScript</Tag> and{" "}
                                  <Tag value="kotlin">Kotlin</Tag>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">SMS-based doctor / patient communication</div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  integrated SMS-based messaging into electronic medical records
                                  system in <Tag value="plpgsql">PL/pgSQL</Tag>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">tooling</div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  migration verification tooling for database changes in{" "}
                                  <Tag value="bash">Bash</Tag>, structured database schema
                                  inspection in <Tag value="rust">Rust</Tag>, command line tools in{" "}
                                  <Tag value="python">Python</Tag> to examine prescriptions
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">back-end tasks</div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  implemented features in <Tag value="kotlin">Kotlin</Tag> and{" "}
                                  <Tag value="plpgsql">PL/pgSQL</Tag>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row-5 col-2">
                    <VerticalLine className="border-[#e5dacf]" />
                  </div>

                  <div className="row-6 col-2">
                    <div className="flex w-full h-full justify-start items-start">
                      <div className="w-[calc(50%+1px)] h-[calc(50%+2px)]  border-r-2 border-[#e5dacf] rounded-br-xl border-b-2"></div>
                    </div>
                  </div>
                  <div className="row-6 col-1">
                    <div className="flex w-full h-full justify-end items-end">
                      <div className="w-[calc(50%+1px)] h-1/2 border-l-2 border-t-2 border-[#e5dacf] rounded-tl-xl"></div>
                    </div>
                  </div>
                  <div className="row-6 col-1">
                    <div className="flex w-full h-full justify-end items-end">
                      <div className="w-[calc(50%+1px)] h-1/2 border-l-2 border-t-2 border-[#e5dacf] rounded-tl-xl"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[48px_auto] grid-rows-[12px_48px_max-content_48px_max-content]">
                  <div className="row-1 col-1">
                    <VerticalLine className="border-[#153558] dark:border-[#367fce]" />
                  </div>
                  <div className="row-2 col-1 place-self-center">
                    <a className="group" href="https://www.cybertec-postgresql.com">
                      <Circle className="border-[#153558] dark:border-[#367fce] group-hover:scale-110 transition-transform p-1">
                        <ComponentSizedImage className="rounded-full" src={OrganisatonCybertec} />
                      </Circle>
                    </a>
                  </div>
                  <div className="row-2 col-2 self-center min-w-0">
                    <div className="flex flex-col pl-4 min-w-0">
                      <a
                        href="https://www.cybertec-postgresql.com"
                        className="font-semibold font-stretch-semi-condensed underline hover:text-label-secondary text-nowrap overflow-ellipsis overflow-hidden"
                      >
                        CYBERTEC PostgreSQL International GmbH
                      </a>
                      <span className="text-sm text-label-secondary text-nowrap overflow-ellipsis overflow-hidden">
                        2018—2022
                        <span className="font-stretch-condensed font-light">
                          {" "}
                          • software engineer
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="row-3 col-1">
                    <VerticalLine className="[border-image:linear-gradient(to_bottom,#153558,#3b4867)_1_100%] dark:[border-image:linear-gradient(to_bottom,#367fce,#3b4867)_1_100%]" />
                  </div>
                  <div className="row-3 col-2">
                    <div className="pl-4 pb-6">
                      <ul className="list-disc [&>*:not(:last-child)]:mb-2">
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">system administration</div>
                            <div>
                              <div className="text-xs">
                                <div>self-service tooling and operated internal services</div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row-4 col-1 place-self-center">
                    <a className="group" href="https://www.htlwrn.ac.at/">
                      <Circle className="border-[#3b4867] group-hover:scale-110 transition-transform p-1">
                        <ComponentSizedImage className="rounded-full" src={OrganisatonHtl} />
                      </Circle>
                    </a>
                  </div>
                  <div className="row-4 col-2 self-center min-w-0">
                    <div className="flex flex-col pl-4 min-w-0">
                      <a
                        href="https://www.htlwrn.ac.at/"
                        className="font-semibold font-stretch-semi-condensed underline hover:text-label-secondary text-nowrap overflow-ellipsis overflow-hidden"
                      >
                        HTBLuVA Wiener Neustadt
                      </a>
                      <span className="text-sm text-label-secondary text-nowrap overflow-ellipsis overflow-hidden">
                        2013 — 2018{" "}
                        <span className="font-stretch-condensed font-light"> • education</span>
                      </span>
                    </div>
                  </div>
                  <div className="row-5 col-2">
                    <div className="pl-4 pb-6">
                      <ul className="list-disc [&>*:not(:last-child)]:mb-2">
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">rocket lander prototype</div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  air pressure control loop daemon in <Tag value="rust">Rust</Tag>{" "}
                                  and <Tag value="python">Python</Tag> with networked sensor data
                                  retrieval and browser-based visualization
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inline-flex flex-col flex-wrap gap-y-1">
                            <div className="text-sm">
                              robotics controller <Tag value="linux">Linux</Tag> distribution
                            </div>
                            <div>
                              <div className="text-xs">
                                <div>
                                  ported sofware and packaged <Tag value="debian">Debian</Tag> based
                                  distribution for bespoke robotics controller
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-y-1">
                  <div className="font-medium text-xl font-[Unbounded]">other stuff</div>
                  <ul className="list-none">
                    <li className="flex gap-x-3 items-baseline">
                      <span>•</span>
                      <div className="flex flex-col flex-nowrap">
                        <div className="shrink">
                          <a
                            href="https://github.com/PhilipTrauner/nibbler"
                            className="font-semibold font-stretch-semi-condensed underline hover:text-label-secondary text-nowrap overflow-ellipsis overflow-hidden"
                          >
                            nibbler
                          </a>
                        </div>
                        <div className="text-xs shrink">
                          proof of concept runtime <Tag value="python">Python</Tag> bytecode
                          optimizer that uses constraints supplied by existing syntax features such
                          as type annotations and decorators to speed up code execution passes
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {typeof sortedTags !== "undefined" && sortedTags.length > 0 ? (
                <div className="flex flex-col gap-y-3">
                  <div className="font-medium text-xl font-[Unbounded]">technologies</div>
                  <div className="flex flex-wrap gap-x-1 gap-y-2">
                    {sortedTags.map(([value, _]) => (
                      <TagSelector key={value} value={value} setValue={setSelectedTag} />
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContextSelectedTag>
  );
};
