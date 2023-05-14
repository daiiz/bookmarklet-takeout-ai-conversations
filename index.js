import { extractChatGPTTexts } from "./src/chatgpt.js";

// *: Change this line if needed
const config = Object.freeze({
  userName: "", // *
  chatgpt: {
    aiName: "chatgpt",
    hashtagLine: "#ChatGPT日記", // *
  },
});

const createScrapboxLines = (origin) => {
  const res = [];
  let data;
  if (origin === "https://chat.openai.com") {
    data = extractChatGPTTexts(config);
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
  copyToClipboard(createScrapboxLines(origin).join("\n"));
};

main();
