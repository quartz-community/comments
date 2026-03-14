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
type CommentsOptions = {
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
declare const _default: (opts: CommentsOptions) => QuartzComponent;

export { _default as Comments, type CommentsOptions };
