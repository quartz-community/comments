import { describe, it, expect } from "vitest";
import Comments from "../src/components/Comments";

describe("Comments Plugin", () => {
  it("should export Comments component", () => {
    expect(Comments).toBeDefined();
  });

  it("should create a component with options", () => {
    const component = Comments({
      provider: "giscus",
      options: {
        repo: "test/repo",
        repoId: "test-id",
        category: "Announcements",
        categoryId: "test-cat-id",
      },
    });
    expect(component).toBeDefined();
    expect(typeof component).toBe("function");
  });
});
