import { classNames } from "../util/lang";
// @ts-expect-error - inline script imported as string by esbuild loader
import script from "./scripts/comments.inline";

interface QuartzComponent {
  (props: QuartzComponentProps): unknown;
  css?: string;
  beforeDOMLoaded?: string;
  afterDOMLoaded?: string;
}

type QuartzComponentProps = {
  ctx: unknown;
  externalResources: unknown;
  fileData: unknown;
  cfg: unknown;
  children: unknown[];
  tree: unknown;
  allFiles: unknown[];
  displayClass?: "mobile-only" | "desktop-only";
};

type QuartzComponentConstructor<Options = undefined> = (opts: Options) => QuartzComponent;

export type CommentsOptions = {
  provider: "giscus";
  options: {
    repo: `${string}/${string}`;
    repoId: string;
    category: string;
    categoryId: string;
    themeUrl?: string;
    lightTheme?: string;
    darkTheme?: string;
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname";
    strict?: boolean;
    reactionsEnabled?: boolean;
    inputPosition?: "top" | "bottom";
    lang?: string;
  };
};

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0";
}

export default ((opts: CommentsOptions) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    // check if comments should be displayed according to frontmatter
    const fd = fileData as Record<string, unknown>;
    const disableComment: boolean =
      typeof (fd.frontmatter as Record<string, unknown>)?.comments !== "undefined" &&
      (!(fd.frontmatter as Record<string, unknown>)?.comments ||
        (fd.frontmatter as Record<string, unknown>)?.comments === "false");
    if (disableComment) {
      return <></>;
    }

    const c = cfg as Record<string, unknown>;
    return (
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? "url"}
        data-strict={boolToStringBool(opts.options.strict ?? true)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? true)}
        data-input-position={opts.options.inputPosition ?? "bottom"}
        data-light-theme={opts.options.lightTheme ?? "light"}
        data-dark-theme={opts.options.darkTheme ?? "dark"}
        data-theme-url={
          opts.options.themeUrl ?? `https://${(c.baseUrl as string) ?? "example.com"}/static/giscus`
        }
        data-lang={opts.options.lang ?? "en"}
      ></div>
    );
  };

  Comments.afterDOMLoaded = script;

  return Comments;
}) satisfies QuartzComponentConstructor<CommentsOptions>;
