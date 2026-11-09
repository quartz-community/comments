# @quartz-community/comments

Adds a comment section to pages using [Giscus](https://giscus.app/) (GitHub Discussions-based). Giscus is currently the only provider.

The repository must be public, have the [giscus app](https://github.com/apps/giscus) installed and Discussions enabled. Use the [Giscus site](https://giscus.app/#repository) to look up `repoId` and `categoryId`.

## Installation

```bash
npx quartz plugin add @quartz-community/comments
```

It is already in the default `quartz.config.yaml` (disabled); set `enabled: true` and fill in the Giscus options to turn it on.

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/comments"
    enabled: true
    options:
      provider: giscus
      options:
        repo: your-name/your-repo
        repoId: your-repo-id
        category: Announcements
        categoryId: your-category-id
    layout:
      position: afterBody
      priority: 10
```

For advanced use cases, you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.Comments({
  provider: "giscus",
  options: {
    repo: "your-name/your-repo",
    repoId: "your-repo-id",
    category: "your-category",
    categoryId: "your-category-id",
  },
});
```

## Configuration

| Option                     | Type                                                                     | Default                             | Description                                               |
| -------------------------- | ------------------------------------------------------------------------ | ----------------------------------- | --------------------------------------------------------- |
| `provider`                 | `"giscus"`                                                               | `"giscus"`                          | The comment provider to use.                              |
| `options.repo`             | `` `${string}/${string}` ``                                              | required                            | The GitHub repository (`owner/name`) to use for comments. |
| `options.repoId`           | `string`                                                                 | required                            | The ID of the GitHub repository.                          |
| `options.category`         | `string`                                                                 | required                            | The GitHub Discussions category to use.                   |
| `options.categoryId`       | `string`                                                                 | required                            | The ID of the GitHub Discussions category.                |
| `options.themeUrl`         | `string`                                                                 | `"https://<baseUrl>/static/giscus"` | URL of the folder with the Giscus theme `.css` files.     |
| `options.lightTheme`       | `string`                                                                 | `"light"`                           | File name (without `.css`) of the light theme.            |
| `options.darkTheme`        | `string`                                                                 | `"dark"`                            | File name (without `.css`) of the dark theme.             |
| `options.mapping`          | `"url" \| "title" \| "og:title" \| "specific" \| "number" \| "pathname"` | `"url"`                             | The mapping between pages and discussions.                |
| `options.strict`           | `boolean`                                                                | `true`                              | Whether to use strict title matching for discussions.     |
| `options.reactionsEnabled` | `boolean`                                                                | `true`                              | Whether to enable reactions for the main post.            |
| `options.inputPosition`    | `"top" \| "bottom"`                                                      | `"bottom"`                          | The position of the comment input box.                    |
| `options.lang`             | `string`                                                                 | `"en"`                              | The language for Giscus.                                  |

The default theme files (`light.css`, `dark.css`) ship with Quartz in `quartz/static/giscus/`, so the default `themeUrl` needs `baseUrl` to be your real domain. For a custom theme, put its `.css` file in `quartz/static/giscus/` and set `lightTheme` / `darkTheme`.

### Disabling comments on a page

Set `comments: false` in a page's frontmatter to hide the comment section on that page:

```yaml
---
title: Comments disabled here!
comments: false
---
```

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/features/comments) for more information.

## License

MIT
