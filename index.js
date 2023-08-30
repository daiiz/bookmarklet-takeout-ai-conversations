import { extractChatGPTTexts } from "./src/chatgpt.js";
import { extractBardTexts } from "./src/bard.js";
import { extractSGETexts } from "./src/sge.js";

// *: Change this line if needed
const config = Object.freeze({
  userName: "", // *
  chatgpt: {
    aiName: "chatgpt",
    hashtagLine: "#ChatGPT日記", // *
  },
  bard: {
    aiName: "bard",
    hashtagLine: "#Bard日記", // *
  },
  sge: {
    aiName: "sge",
    hashtagLine: "#SGE日記", // *
    titlePrefix: "Google検索: ", // *
  },
});

const createScrapboxLines = ({ origin, href }) => {
  const res = [];
  let data;
  if (origin === "https://chat.openai.com") {
    data = extractChatGPTTexts(config);
  } else if (origin === "https://bard.google.com") {
    data = extractBardTexts(config);
  } else if (
    href.startsWith("https://www.google.com/search?") ||
    href.startsWith("https://www.google.co.jp/search?")
  ) {
    data = extractSGETexts(config);
  }
  if (!data) {
    return res;
  }
  const { title, contents, hashtagLine } = data;
  res.push(title);
  res.push(new Date().toLocaleDateString(), "");
  res.push(...contents);
  res.push("", hashtagLine);
  return res;
};

const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

const main = () => {
  const origin = window.location.origin;
  const href = window.location.href;
  copyToClipboard(createScrapboxLines({ origin, href }).join("\n"));
};

main();
