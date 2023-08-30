/**
 * Search Generative Experience
 * https://japan.googleblog.com/2023/08/search-sge.html
 */

const getUserName = () => {
  return "me"; // WIP
};

const getChatTitle = () => {
  // 検索クエリを採用する
  const form = document.querySelector("form");
  const textarea = form.querySelector("textarea");
  const query = (textarea?.value || "No title").substring(0, 50);
};

getChatContents = ({ userName, aiName }) => {
  let container = null;
  const h1s = document.querySelectorAll("h1");
  for (const h1 of h1s) {
    const text = h1.textContent;
    if (text === "AI による概要") {
      container = h1.parentNode;
      break;
    }
  }
  if (!container) {
    console.error("No container");
    return;
  }
  // いつまで生きていられるか！
  const div = container.querySelector("div");
  let targetDiv = div.querySelector("div[jscontroller]").querySelector("div");
  targetDiv = targetDiv
    .querySelector("div[jsname]")
    .querySelector("div[data-ve-view]");
  targetDiv = targetDiv
    .querySelector("div[jsname]")
    .querySelector("div[jsaction]");
  targetDiv = targetDiv.lastElementChild;
  targetDiv = targetDiv.firstElementChild;
  targetDiv = targetDiv.querySelector("div[jsname]");
  // console.log(targetDiv);

  const texts = [];
  for (const child of targetDiv.children) {
    const text = child.innerText;
    if (text.includes("\n")) {
      // 箇条書きコンテンツ
      const lines = text.split("\n");
      texts.push(...lines.map((x) => `\t${x}`));
    } else {
      texts.push(text);
    }
  }
  console.log(texts);
};

export function extractSGETexts({ userName, sge }) {
  const consts = {
    userName: getUserName() || userName || "me",
    aiName: sge.aiName || "ai",
  };
  const title = getChatTitle();
  const contents = getChatContents(consts);
  return {
    title,
    contents,
    hashtagLine: sge.hashtagLine,
  };
}

// AI による概要 h1
