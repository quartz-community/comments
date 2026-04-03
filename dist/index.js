import { classNames } from '@quartz-community/utils/lang';
import { jsx, Fragment } from 'preact/jsx-runtime';

// src/util/lang.ts

// src/components/scripts/comments.inline.ts
var comments_inline_default = 'var d=s=>{let e=s.detail.theme,t=document.querySelector("iframe.giscus-frame");t&&t.contentWindow&&t.contentWindow.postMessage({giscus:{setConfig:{theme:c(r(e))}}},"https://giscus.app")},r=s=>{if(s!=="dark"&&s!=="light")return s;let e=document.querySelector(".giscus");if(!e)return s;let t=e.dataset.darkTheme??"dark",a=e.dataset.lightTheme??"light";return s==="dark"?t:a},c=s=>{let e=document.querySelector(".giscus");return e?`${e.dataset.themeUrl??"https://giscus.app/themes"}/${s}.css`:`https://giscus.app/themes/${s}.css`},n=[],u=s=>{n.push(s)};if(typeof document<"u"){let s=()=>{n.forEach(o=>o()),n.length=0;let e=document.querySelector(".giscus");if(!e)return;let t=document.createElement("script");t.src="https://giscus.app/client.js",t.async=!0,t.crossOrigin="anonymous",t.setAttribute("data-loading","lazy"),t.setAttribute("data-emit-metadata","0"),t.setAttribute("data-repo",e.dataset.repo),t.setAttribute("data-repo-id",e.dataset.repoId),t.setAttribute("data-category",e.dataset.category),t.setAttribute("data-category-id",e.dataset.categoryId),t.setAttribute("data-mapping",e.dataset.mapping),t.setAttribute("data-strict",e.dataset.strict),t.setAttribute("data-reactions-enabled",e.dataset.reactionsEnabled),t.setAttribute("data-input-position",e.dataset.inputPosition),t.setAttribute("data-lang",e.dataset.lang);let a=document.documentElement.getAttribute("saved-theme");a&&t.setAttribute("data-theme",c(r(a))),e.appendChild(t);let i=d;document.addEventListener("themechange",i),u(()=>document.removeEventListener("themechange",i))};document.addEventListener("nav",s),document.addEventListener("render",s)}\n';
function boolToStringBool(b) {
  return b ? "1" : "0";
}
var Comments_default = ((opts) => {
  const Comments = ({ displayClass, fileData, cfg }) => {
    const fd = fileData;
    const disableComment = typeof fd.frontmatter?.comments !== "undefined" && (!fd.frontmatter?.comments || fd.frontmatter?.comments === "false");
    if (disableComment) {
      return /* @__PURE__ */ jsx(Fragment, {});
    }
    const c = cfg;
    return /* @__PURE__ */ jsx(
      "div",
      {
        class: classNames(displayClass, "giscus"),
        "data-repo": opts.options.repo,
        "data-repo-id": opts.options.repoId,
        "data-category": opts.options.category,
        "data-category-id": opts.options.categoryId,
        "data-mapping": opts.options.mapping ?? "url",
        "data-strict": boolToStringBool(opts.options.strict ?? true),
        "data-reactions-enabled": boolToStringBool(opts.options.reactionsEnabled ?? true),
        "data-input-position": opts.options.inputPosition ?? "bottom",
        "data-light-theme": opts.options.lightTheme ?? "light",
        "data-dark-theme": opts.options.darkTheme ?? "dark",
        "data-theme-url": opts.options.themeUrl ?? `https://${c.baseUrl ?? "example.com"}/static/giscus`,
        "data-lang": opts.options.lang ?? "en"
      }
    );
  };
  Comments.afterDOMLoaded = comments_inline_default;
  return Comments;
});

export { Comments_default as Comments };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map