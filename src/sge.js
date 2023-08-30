/**
 * Search Generative Experience
 * https://japan.googleblog.com/2023/08/search-sge.html
 */

const getUserName = (userName) => {
  return userName || "me"; // WIP
};

const getChatTitle = () => {
  // 検索クエリを採用する
  const form = document.querySelector("form");
  const textarea = form.querySelector("textarea");
  const query = (textarea?.value || "No title").substring(0, 50);
  return query;
};

const getChatContents = ({ userName, aiName }) => {
  const query = getChatTitle();

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

  const aiTexts = [];
  for (const child of targetDiv.children) {
    const text = child.innerText;
    if (text.includes("\n")) {
      // 箇条書きコンテンツ
      const lines = text.split("\n");
      aiTexts.push(...lines.map((x) => `\t${x}`));
    } else {
      aiTexts.push(text);
    }
  }

  const res = [];
  res.push(`[${userName}.icon] ${query}`);
  res.push(`[${aiName}.icon]`);
  res.push(...aiTexts.map((x) => `\t${x}`));

  return res;
};

export function extractSGETexts({ userName, sge }) {
  const consts = {
    userName: getUserName(userName) || userName || "me",
    aiName: sge.aiName || "ai",
  };
  const title = getChatTitle();
  const contents = getChatContents(consts);
  console.log({ title, contents });
  return {
    title: `${sge.titlePrefix}${title}`,
    contents,
    hashtagLine: sge.hashtagLine,
  };
}
