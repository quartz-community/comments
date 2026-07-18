# @quartz-community/comments

Adds a comment section to pages using Giscus (GitHub Discussions), Bluesky, or Hacker News.

## Installation

```bash
npx quartz plugin add github:quartz-community/comments
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/comments
    enabled: true
    options:
      provider: giscus # Or "bluesky" or "hackernews"
      options: {}
    layout:
      position: afterBody
      priority: 10
```

---

## Providers Setup

### 1. Bluesky

Pulls a reply thread directly from a Bluesky post.

1. Set the provider to `"bluesky"` in `quartz.config.yaml`.
2. Add the `blueskyUrl` field pointing to the post in the page's frontmatter:

   ```markdown
   ---
   title: My Blog Post
   blueskyUrl: https://bsky.app/profile/username.bsky.social/post/3mq...
   ---
   ```

### 2. Hacker News

Pulls a reply thread directly from a Hacker News item thread.

1. Set the provider to `"hackernews"` in `quartz.config.yaml`.
2. Add the `hnId` or `hnUrl` field in the page's frontmatter:

   ```markdown
   ---
   title: My Blog Post
   hnId: 123456
   # Or full url:
   # hnUrl: https://news.ycombinator.com/item?id=123456
   ---
   ```

### 3. Giscus

GitHub Discussions-based commenting system.

1. Set the provider to `"giscus"`.
2. Provide your repository options:

   ```ts title="quartz.ts (override)"
   import * as ExternalPlugin from "./.quartz/plugins";

   ExternalPlugin.Comments({
     provider: "giscus",
     options: {
       repo: "your-repo",
       repoId: "your-repo-id",
       category: "your-category",
       categoryId: "your-category-id",
     },
   });
   ```

---

## Configuration

| Option                     | Type                                    | Default     | Description                                    |
| -------------------------- | --------------------------------------- | ----------- | ---------------------------------------------- |
| `provider`                 | `"giscus" \| "bluesky" \| "hackernews"` | -           | The comment provider to use.                   |
| `options.repo`             | `string`                                | -           | (Giscus only) The GitHub repository to use.    |
| `options.repoId`           | `string`                                | -           | (Giscus only) The ID of the GitHub repository. |
| `options.category`         | `string`                                | -           | (Giscus only) The Discussions category to use. |
| `options.categoryId`       | `string`                                | -           | (Giscus only) The ID of the category.          |
| `options.themeUrl`         | `string`                                | `undefined` | (Giscus only) Custom theme URL for Giscus.     |
| `options.lightTheme`       | `string`                                | `"light"`   | (Giscus only) The light theme for Giscus.      |
| `options.darkTheme`        | `string`                                | `"dark"`    | (Giscus only) The dark theme for Giscus.       |
| `options.mapping`          | `string`                                | `"url"`     | (Giscus only) Page to discussion mapping.      |
| `options.strict`           | `boolean`                               | `true`      | (Giscus only) Use strict discussion matching.  |
| `options.reactionsEnabled` | `boolean`                               | `true`      | (Giscus only) Enable reactions for comments.   |
| `options.inputPosition`    | `"top" \| "bottom"`                     | `"bottom"`  | (Giscus only) The position of the input box.   |
| `options.lang`             | `string`                                | `"en"`      | (Giscus only) The language for Giscus.         |

---

## Customization

You can conditionally disable comments on a specific page by setting `comments: false` in that page's frontmatter:

```markdown
---
title: Comments Disabled
comments: false
---
```

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/features/comments) for more information.

## License

MIT
