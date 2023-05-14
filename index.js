const { extractChatGPTTexts } = require("./src/chatgpt");

const yourName = ""; // Please change to your name

const createScrapboxLines = () => {
  const res = [];
  const { title, contents, hashtagLine } = extractChatGPTTexts(yourName);
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
