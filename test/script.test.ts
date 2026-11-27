import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { bundleInline, runInline } from "./inlineScript";

const SCRIPT = new URL("../src/components/scripts/comments.inline.ts", import.meta.url).pathname;

interface FakeScript {
  tagName: "script";
  src?: string;
  async?: boolean;
  crossOrigin?: string;
  attributes: Record<string, string>;
  setAttribute(name: string, value: string): void;
}

/** A page with the Comments component's container, as it renders with these data attributes. */
function page(opts: {
  dataset?: Record<string, string>;
  savedTheme?: string;
  container?: boolean;
}) {
  const appended: FakeScript[] = [];
  const posted: { message: unknown; origin: string }[] = [];
  const container = {
    dataset: {
      repo: "owner/repo",
      repoId: "R_1",
      category: "Comments",
      categoryId: "C_1",
      mapping: "pathname",
      strict: "1",
      reactionsEnabled: "0",
      inputPosition: "top",
      lightTheme: "light",
      darkTheme: "dark",
      themeUrl: "https://example.com/sub/static/giscus",
      lang: "nl",
      ...opts.dataset,
    },
    appendChild: (el: FakeScript) => appended.push(el),
  };
  const iframe = {
    contentWindow: {
      postMessage: (message: unknown, origin: string) => posted.push({ message, origin }),
    },
  };
  const document = Object.assign(new EventTarget(), {
    documentElement: {
      getAttribute: (name: string) => (name === "saved-theme" ? (opts.savedTheme ?? null) : null),
    },
    querySelector: (selector: string) =>
      selector === ".giscus"
        ? opts.container === false
          ? null
          : container
        : selector === "iframe.giscus-frame"
          ? iframe
          : null,
    createElement: (): FakeScript => {
      const el: FakeScript = {
        tagName: "script",
        attributes: {},
        setAttribute: (name, value) => {
          el.attributes[name] = value;
        },
      };
      return el;
    },
  });
  vi.stubGlobal("document", document);
  return {
    appended,
    posted,
    nav: () => document.dispatchEvent(new CustomEvent("nav")),
    render: () => document.dispatchEvent(new CustomEvent("render")),
    themechange: (theme: string) =>
      document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } })),
  };
}

describe("comments script", () => {
  let script: string;
  beforeAll(async () => {
    script = await bundleInline(SCRIPT);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("loads giscus lazily with the container's configuration on navigation", () => {
    const p = page({ savedTheme: "dark" });
    runInline(script);
    p.nav();
    expect(p.appended).toHaveLength(1);
    const giscus = p.appended[0]!;
    expect(giscus).toMatchObject({
      src: "https://giscus.app/client.js",
      async: true,
      crossOrigin: "anonymous",
    });
    expect(giscus.attributes).toEqual({
      "data-loading": "lazy",
      "data-emit-metadata": "0",
      "data-repo": "owner/repo",
      "data-repo-id": "R_1",
      "data-category": "Comments",
      "data-category-id": "C_1",
      "data-mapping": "pathname",
      "data-strict": "1",
      "data-reactions-enabled": "0",
      "data-input-position": "top",
      "data-lang": "nl",
      "data-theme": "https://example.com/sub/static/giscus/dark.css",
    });
  });

  it("uses the configured light/dark theme files for the site theme", () => {
    const p = page({
      savedTheme: "light",
      dataset: { lightTheme: "my-light", darkTheme: "my-dark" },
    });
    runInline(script);
    p.nav();
    expect(p.appended[0]!.attributes["data-theme"]).toBe(
      "https://example.com/sub/static/giscus/my-light.css",
    );
  });

  it("switches the giscus theme when the site theme changes", () => {
    const p = page({ savedTheme: "light", dataset: { darkTheme: "my-dark" } });
    runInline(script);
    p.nav();
    p.themechange("dark");
    expect(p.posted).toEqual([
      {
        message: {
          giscus: { setConfig: { theme: "https://example.com/sub/static/giscus/my-dark.css" } },
        },
        origin: "https://giscus.app",
      },
    ]);
  });

  it("listens for theme changes once, however many pages were visited", () => {
    const p = page({ savedTheme: "light" });
    runInline(script);
    p.nav();
    p.nav();
    p.nav();
    p.themechange("dark");
    expect(p.posted).toHaveLength(1);
  });

  it("does nothing on a page without comments (frontmatter comments: false)", () => {
    const p = page({ container: false });
    runInline(script);
    p.nav();
    expect(p.appended).toEqual([]);
  });

  // bug (low): setup runs on `render` too and appends another client.js to the same container,
  // so giscus loads a second time on a page whose content re-rendered (encrypted-pages
  // dispatches `render` after an unlock and after patching the content index).
  it.fails("doesn't load giscus a second time on a `render` event", () => {
    const p = page({ savedTheme: "light" });
    runInline(script);
    p.nav();
    p.render();
    expect(p.appended).toHaveLength(1);
  });
});
