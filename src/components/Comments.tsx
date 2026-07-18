import type { QuartzComponent, QuartzComponentProps } from "@quartz-community/types";
import { classNames } from "../util/lang";
// @ts-expect-error - inline script imported as string by esbuild loader
import script from "./scripts/comments.inline";
// @ts-expect-error - inline script imported as string by esbuild loader
import blueskyScript from "./scripts/bluesky.inline";
import blueskyStyle from "./styles/bluesky.scss";
// @ts-expect-error - inline script imported as string by esbuild loader
import hackernewsScript from "./scripts/hackernews.inline";
import hackernewsStyle from "./styles/hackernews.scss";

type RequiredOptsConstructor<Options> = (opts: Options) => QuartzComponent;

export type CommentsOptions =
  | {
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
    }
  | {
      provider: "bluesky";
      options?: Record<string, never>;
    }
  | {
      provider: "hackernews";
      options?: Record<string, never>;
    };

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0";
}

export default ((opts: CommentsOptions) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    const commentsOverride = fileData.frontmatter?.comments;
    if (commentsOverride === false || commentsOverride === "false") {
      return <></>;
    }

    if (opts.provider === "bluesky") {
      const blueskyUrl = fileData.frontmatter?.blueskyUrl as string | undefined;
      if (!blueskyUrl) {
        return <></>;
      }
      return (
        <div
          class={classNames(displayClass, "bluesky-comments-container")}
          id="bluesky-comments"
          data-url={blueskyUrl}
        >
          <h2>Comments</h2>
          <p class="bluesky-meta">
            Post a reply on{" "}
            <a href={blueskyUrl} target="_blank" rel="noopener noreferrer">
              Bluesky
            </a>{" "}
            to join the conversation.
          </p>
          <div id="bluesky-comments-list">
            <p>Loading comments...</p>
          </div>
        </div>
      );
    }

    if (opts.provider === "hackernews") {
      const hnId = fileData.frontmatter?.hnId
        ? String(fileData.frontmatter.hnId)
        : (fileData.frontmatter?.hnUrl as string | undefined);
      if (!hnId) {
        return <></>;
      }
      const threadUrl = hnId.startsWith("http")
        ? hnId
        : `https://news.ycombinator.com/item?id=${hnId}`;
      return (
        <div
          class={classNames(displayClass, "hackernews-comments-container")}
          id="hackernews-comments"
          data-id={hnId}
        >
          <h2>Comments</h2>
          <p class="hackernews-meta">
            Post a reply on{" "}
            <a href={threadUrl} target="_blank" rel="noopener noreferrer">
              Hacker News
            </a>{" "}
            to join the conversation.
          </p>
          <div id="hackernews-comments-list">
            <p>Loading comments...</p>
          </div>
        </div>
      );
    }

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
          opts.options.themeUrl ?? `https://${cfg.baseUrl ?? "example.com"}/static/giscus`
        }
        data-lang={opts.options.lang ?? "en"}
      ></div>
    );
  };

  if (opts.provider === "giscus") {
    Comments.afterDOMLoaded = script;
  } else if (opts.provider === "bluesky") {
    Comments.afterDOMLoaded = blueskyScript;
    Comments.css = blueskyStyle;
  } else if (opts.provider === "hackernews") {
    Comments.afterDOMLoaded = hackernewsScript;
    Comments.css = hackernewsStyle;
  }

  return Comments;
}) satisfies RequiredOptsConstructor<CommentsOptions>;
