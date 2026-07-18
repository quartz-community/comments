/* eslint-disable @typescript-eslint/no-explicit-any */
function parseHnUrl(urlOrId: string): string {
  if (/^\d+$/.test(urlOrId)) return urlOrId;
  try {
    const url = new URL(urlOrId);
    const id = url.searchParams.get("id");
    if (id) return id;
  } catch (e) {
    // Ignore URL parse error
  }
  throw new Error("Invalid Hacker News URL or ID");
}

async function fetchHnThread(id: string) {
  const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  if (!res.ok) throw new Error("Failed to fetch HN comments");
  const data = await res.json();
  return data.children;
}

function renderHnComments(replies: any[]) {
  const commentsList = document.getElementById("hackernews-comments-list");
  if (!commentsList) return;
  if (replies && replies.length > 0) {
    commentsList.innerHTML = ""; // Clear loading text
    replies.forEach((reply: any) => {
      if (!reply.author && !reply.text) return;
      commentsList.appendChild(createHnCommentNode(reply));
    });
  } else {
    commentsList.textContent = "No comments yet.";
  }
}

function createHnCommentNode(reply: any): HTMLElement {
  const div = document.createElement("div");
  div.className = "comment";

  // Header
  const header = document.createElement("div");
  header.className = "comment-header";

  const authorLink = document.createElement("a");
  authorLink.href = `https://news.ycombinator.com/user?id=${reply.author || ""}`;
  authorLink.target = "_blank";
  authorLink.className = "author";
  authorLink.textContent = reply.author || "[deleted]";
  header.appendChild(authorLink);

  const timeSpan = document.createElement("span");
  timeSpan.className = "time";
  if (reply.created_at) {
    timeSpan.textContent = new Date(reply.created_at).toLocaleDateString();
  } else {
    timeSpan.textContent = "";
  }
  header.appendChild(timeSpan);
  div.appendChild(header);

  // Body
  const body = document.createElement("div");
  body.className = "comment-body";
  body.innerHTML = reply.text || "[deleted]";
  div.appendChild(body);

  // Recursive replies
  if (reply.children && reply.children.length > 0) {
    const repliesContainer = document.createElement("div");
    repliesContainer.className = "replies";
    reply.children.forEach((child: any) => {
      if (!child.author && !child.text) return;
      repliesContainer.appendChild(createHnCommentNode(child));
    });
    div.appendChild(repliesContainer);
  }

  return div;
}

if (typeof document !== "undefined") {
  const setupHnComments = async () => {
    const container = document.getElementById("hackernews-comments");
    if (!container) return;
    const urlOrId = container.getAttribute("data-id");
    if (!urlOrId) return;

    const commentsList = document.getElementById("hackernews-comments-list");
    if (commentsList) {
      commentsList.innerHTML = "<p>Loading comments...</p>";
    }

    try {
      const id = parseHnUrl(urlOrId);
      const replies = await fetchHnThread(id);
      renderHnComments(replies);
    } catch (e) {
      console.error("Error loading Hacker News comments:", e);
      if (commentsList) {
        commentsList.textContent = "Error loading comments.";
      }
    }
  };

  document.addEventListener("nav", setupHnComments);
  document.addEventListener("render", setupHnComments);
}
