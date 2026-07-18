// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/scripts/comments.inline.ts
var comments_inline_default = 'var d=s=>{let e=s.detail.theme,t=document.querySelector("iframe.giscus-frame");t&&t.contentWindow&&t.contentWindow.postMessage({giscus:{setConfig:{theme:c(r(e))}}},"https://giscus.app")},r=s=>{if(s!=="dark"&&s!=="light")return s;let e=document.querySelector(".giscus");if(!e)return s;let t=e.dataset.darkTheme??"dark",a=e.dataset.lightTheme??"light";return s==="dark"?t:a},c=s=>{let e=document.querySelector(".giscus");return e?`${e.dataset.themeUrl??"https://giscus.app/themes"}/${s}.css`:`https://giscus.app/themes/${s}.css`},n=[],u=s=>{n.push(s)};if(typeof document<"u"){let s=()=>{n.forEach(o=>o()),n.length=0;let e=document.querySelector(".giscus");if(!e)return;let t=document.createElement("script");t.src="https://giscus.app/client.js",t.async=!0,t.crossOrigin="anonymous",t.setAttribute("data-loading","lazy"),t.setAttribute("data-emit-metadata","0"),t.setAttribute("data-repo",e.dataset.repo),t.setAttribute("data-repo-id",e.dataset.repoId),t.setAttribute("data-category",e.dataset.category),t.setAttribute("data-category-id",e.dataset.categoryId),t.setAttribute("data-mapping",e.dataset.mapping),t.setAttribute("data-strict",e.dataset.strict),t.setAttribute("data-reactions-enabled",e.dataset.reactionsEnabled),t.setAttribute("data-input-position",e.dataset.inputPosition),t.setAttribute("data-lang",e.dataset.lang);let a=document.documentElement.getAttribute("saved-theme");a&&t.setAttribute("data-theme",c(r(a))),e.appendChild(t);let i=d;document.addEventListener("themechange",i),u(()=>document.removeEventListener("themechange",i))};document.addEventListener("nav",s),document.addEventListener("render",s)}\n';

// src/components/scripts/bluesky.inline.ts
var bluesky_inline_default = 'function f(a){let n=new URL(a).pathname.split("/"),t=n[2],o=n[4];if(!t||!o)throw new Error("Invalid Bluesky URL");return{handle:t,postId:o}}async function y(a){let n=await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${a}`);if(!n.ok)throw new Error("Could not resolve handle");let{did:t}=await n.json();return t}async function C(a,n){let t=`at://${a}/app.bsky.feed.post/${n}`,o=await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${t}&depth=10&parentHeight=0`);if(!o.ok)throw new Error("Could not fetch thread");return(await o.json()).thread.replies}function k(a){let n=document.getElementById("bluesky-comments-list");n&&(a&&a.length>0?(n.innerHTML="",a.sort((t,o)=>(o.post.likeCount||0)-(t.post.likeCount||0)),a.forEach(t=>{t.post&&n.appendChild(h(t))})):n.textContent="No comments yet.")}function h(a){let n=a.post,t=n.author,o=new Date(n.indexedAt).toLocaleDateString(),s=document.createElement("div");s.className="comment";let c=document.createElement("div");if(c.className="comment-header",t.avatar){let e=document.createElement("img");e.src=t.avatar,e.alt=t.handle,c.appendChild(e)}let r=document.createElement("a"),d=n.uri.split("/").pop();r.href=`https://bsky.app/profile/${t.did}/post/${d}`,r.target="_blank",r.className="handle",r.textContent=t.displayName||t.handle,c.appendChild(r);let p=document.createElement("span");p.className="time",p.textContent=o,c.appendChild(p),s.appendChild(c),s.appendChild(x(n));let m=document.createElement("div");m.className="comment-actions";let l=document.createElement("span");l.textContent=`\\u2764\\uFE0F ${n.likeCount||0}`,m.appendChild(l);let i=document.createElement("span");if(i.textContent=`\\u{1F501} ${n.repostCount||0}`,m.appendChild(i),s.appendChild(m),a.replies&&a.replies.length>0){let e=document.createElement("div");e.className="replies",a.replies.forEach(u=>{u.post&&e.appendChild(h(u))}),s.appendChild(e)}return s}function x(a){let n=a.record.text,t=a.record.facets,o=document.createElement("div");if(o.className="comment-body",!t||t.length===0)return o.textContent=n,o;t.sort((r,d)=>r.index.byteStart-d.index.byteStart);let s=new TextEncoder().encode(n),c=0;for(let r of t){let{byteStart:d,byteEnd:p}=r.index;if(d>c){let e=s.slice(c,d),u=document.createTextNode(new TextDecoder().decode(e));o.appendChild(u)}let m=s.slice(d,p),l=new TextDecoder().decode(m),i=r.features[0];if(i.$type==="app.bsky.richtext.facet#link"){let e=document.createElement("a");e.href=i.uri,e.target="_blank",e.rel="noopener noreferrer",e.textContent=l,o.appendChild(e)}else if(i.$type==="app.bsky.richtext.facet#mention"){let e=document.createElement("a");e.href=`https://bsky.app/profile/${i.did}`,e.target="_blank",e.rel="noopener noreferrer",e.textContent=l,o.appendChild(e)}else if(i.$type==="app.bsky.richtext.facet#tag"){let e=document.createElement("a");e.href=`https://bsky.app/hashtag/${i.tag}`,e.target="_blank",e.rel="noopener noreferrer",e.textContent=l,o.appendChild(e)}else o.appendChild(document.createTextNode(l));c=p}if(c<s.length){let r=s.slice(c);o.appendChild(document.createTextNode(new TextDecoder().decode(r)))}return o}if(typeof document<"u"){let a=async()=>{let n=document.getElementById("bluesky-comments");if(!n)return;let t=n.getAttribute("data-url");if(!t)return;let o=document.getElementById("bluesky-comments-list");o&&(o.innerHTML="<p>Loading comments...</p>");try{let{handle:s,postId:c}=f(t),r=await y(s),d=await C(r,c);k(d)}catch(s){console.error("Error loading Bluesky comments:",s),o&&(o.textContent="Error loading comments.")}};document.addEventListener("nav",a),document.addEventListener("render",a)}\n';

// src/components/styles/bluesky.scss
var bluesky_default = ".bluesky-comments-container {\n  margin-top: 4rem;\n  padding-top: 2rem;\n  border-top: 1px solid var(--lightgray);\n  h2 {\n    margin-bottom: 1rem;\n  }\n  .bluesky-meta {\n    margin-bottom: 1.5rem;\n    color: var(--gray);\n    font-size: 0.9rem;\n    a {\n      color: var(--secondary);\n      text-decoration: none;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n  .comment {\n    margin-top: 1rem;\n    padding-left: 1rem;\n    border-left: 2px solid var(--lightgray);\n    .comment-header {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      margin-bottom: 0.5rem;\n      img {\n        width: 24px;\n        height: 24px;\n        border-radius: 50%;\n      }\n      .handle {\n        font-weight: bold;\n        color: var(--dark);\n        font-size: 0.9rem;\n      }\n      .time {\n        color: var(--gray);\n        font-size: 0.8rem;\n      }\n    }\n    .comment-body {\n      font-size: 0.95rem;\n      color: var(--darkgray);\n      white-space: pre-wrap;\n      a {\n        color: var(--secondary);\n        text-decoration: none;\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n    }\n    .comment-actions {\n      margin-top: 0.25rem;\n      font-size: 0.8rem;\n      color: var(--gray);\n      display: flex;\n      gap: 1rem;\n    }\n  }\n}\n";

// src/components/scripts/hackernews.inline.ts
var hackernews_inline_default = 'function d(e){if(/^\\d+$/.test(e))return e;try{let n=new URL(e).searchParams.get("id");if(n)return n}catch{}throw new Error("Invalid Hacker News URL or ID")}async function m(e){let t=await fetch(`https://hn.algolia.com/api/v1/items/${e}`);if(!t.ok)throw new Error("Failed to fetch HN comments");return(await t.json()).children}function h(e){let t=document.getElementById("hackernews-comments-list");t&&(e&&e.length>0?(t.innerHTML="",e.forEach(n=>{!n.author&&!n.text||t.appendChild(i(n))})):t.textContent="No comments yet.")}function i(e){let t=document.createElement("div");t.className="comment";let n=document.createElement("div");n.className="comment-header";let a=document.createElement("a");a.href=`https://news.ycombinator.com/user?id=${e.author||""}`,a.target="_blank",a.className="author",a.textContent=e.author||"[deleted]",n.appendChild(a);let o=document.createElement("span");o.className="time",e.created_at?o.textContent=new Date(e.created_at).toLocaleDateString():o.textContent="",n.appendChild(o),t.appendChild(n);let c=document.createElement("div");if(c.className="comment-body",c.innerHTML=e.text||"[deleted]",t.appendChild(c),e.children&&e.children.length>0){let r=document.createElement("div");r.className="replies",e.children.forEach(s=>{!s.author&&!s.text||r.appendChild(i(s))}),t.appendChild(r)}return t}if(typeof document<"u"){let e=async()=>{let t=document.getElementById("hackernews-comments");if(!t)return;let n=t.getAttribute("data-id");if(!n)return;let a=document.getElementById("hackernews-comments-list");a&&(a.innerHTML="<p>Loading comments...</p>");try{let o=d(n),c=await m(o);h(c)}catch(o){console.error("Error loading Hacker News comments:",o),a&&(a.textContent="Error loading comments.")}};document.addEventListener("nav",e),document.addEventListener("render",e)}\n';

// src/components/styles/hackernews.scss
var hackernews_default = ".hackernews-comments-container {\n  margin-top: 4rem;\n  padding-top: 2rem;\n  border-top: 1px solid var(--lightgray);\n  h2 {\n    margin-bottom: 1rem;\n  }\n  .hackernews-meta {\n    margin-bottom: 1.5rem;\n    color: var(--gray);\n    font-size: 0.9rem;\n    a {\n      color: var(--secondary);\n      text-decoration: none;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n  }\n  .comment {\n    margin-top: 1rem;\n    padding-left: 1rem;\n    border-left: 2px solid var(--lightgray);\n    .comment-header {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      margin-bottom: 0.5rem;\n      .author {\n        font-weight: bold;\n        color: var(--dark);\n        font-size: 0.9rem;\n        text-decoration: none;\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n      .time {\n        color: var(--gray);\n        font-size: 0.8rem;\n      }\n    }\n    .comment-body {\n      font-size: 0.95rem;\n      color: var(--darkgray);\n      p {\n        margin: 0.5rem 0;\n      }\n      pre {\n        background-color: var(--lightgray);\n        padding: 0.5rem;\n        border-radius: 4px;\n        overflow-x: auto;\n      }\n      code {\n        font-family: var(--codeVal);\n        font-size: 0.85rem;\n      }\n      a {\n        color: var(--secondary);\n        text-decoration: none;\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n    }\n  }\n}\n";
var l;
function S(n2) {
  return n2.children;
}
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/Comments.tsx
function boolToStringBool(b2) {
  return b2 ? "1" : "0";
}
var Comments_default = ((opts) => {
  const Comments = ({ displayClass, fileData, cfg }) => {
    const commentsOverride = fileData.frontmatter?.comments;
    if (commentsOverride === false || commentsOverride === "false") {
      return /* @__PURE__ */ u2(S, {});
    }
    if (opts.provider === "bluesky") {
      const blueskyUrl = fileData.frontmatter?.blueskyUrl;
      if (!blueskyUrl) {
        return /* @__PURE__ */ u2(S, {});
      }
      return /* @__PURE__ */ u2(
        "div",
        {
          class: classNames(displayClass, "bluesky-comments-container"),
          id: "bluesky-comments",
          "data-url": blueskyUrl,
          children: [
            /* @__PURE__ */ u2("h2", { children: "Comments" }),
            /* @__PURE__ */ u2("p", { class: "bluesky-meta", children: [
              "Post a reply on",
              " ",
              /* @__PURE__ */ u2("a", { href: blueskyUrl, target: "_blank", rel: "noopener noreferrer", children: "Bluesky" }),
              " ",
              "to join the conversation."
            ] }),
            /* @__PURE__ */ u2("div", { id: "bluesky-comments-list", children: /* @__PURE__ */ u2("p", { children: "Loading comments..." }) })
          ]
        }
      );
    }
    if (opts.provider === "hackernews") {
      const hnId = fileData.frontmatter?.hnId ? String(fileData.frontmatter.hnId) : fileData.frontmatter?.hnUrl;
      if (!hnId) {
        return /* @__PURE__ */ u2(S, {});
      }
      const threadUrl = hnId.startsWith("http") ? hnId : `https://news.ycombinator.com/item?id=${hnId}`;
      return /* @__PURE__ */ u2(
        "div",
        {
          class: classNames(displayClass, "hackernews-comments-container"),
          id: "hackernews-comments",
          "data-id": hnId,
          children: [
            /* @__PURE__ */ u2("h2", { children: "Comments" }),
            /* @__PURE__ */ u2("p", { class: "hackernews-meta", children: [
              "Post a reply on",
              " ",
              /* @__PURE__ */ u2("a", { href: threadUrl, target: "_blank", rel: "noopener noreferrer", children: "Hacker News" }),
              " ",
              "to join the conversation."
            ] }),
            /* @__PURE__ */ u2("div", { id: "hackernews-comments-list", children: /* @__PURE__ */ u2("p", { children: "Loading comments..." }) })
          ]
        }
      );
    }
    return /* @__PURE__ */ u2(
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
        "data-theme-url": opts.options.themeUrl ?? `https://${cfg.baseUrl ?? "example.com"}/static/giscus`,
        "data-lang": opts.options.lang ?? "en"
      }
    );
  };
  if (opts.provider === "giscus") {
    Comments.afterDOMLoaded = comments_inline_default;
  } else if (opts.provider === "bluesky") {
    Comments.afterDOMLoaded = bluesky_inline_default;
    Comments.css = bluesky_default;
  } else if (opts.provider === "hackernews") {
    Comments.afterDOMLoaded = hackernews_inline_default;
    Comments.css = hackernews_default;
  }
  return Comments;
});

export { Comments_default as Comments };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map