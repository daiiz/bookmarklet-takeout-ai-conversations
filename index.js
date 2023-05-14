import { extractChatGPTTexts } from "./src/chatgpt.js";

// *: Change this config if needed
const config = Object.freeze({
  userName: "", // *
  chatgpt: {
    aiName: "chatgpt",
    hashtagLine: "#ChatGPT日記", // *
  },
});

const createScrapboxLines = () => {
  let data;
  if (window.location.origin === "https://chat.openai.com") {
    data = extractChatGPTTexts(config);
  }
  const { title, contents, hashtagLine } = data;
  const res = [];
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
  copyToClipboard(createScrapboxLines().join("\n"));
};

main();
