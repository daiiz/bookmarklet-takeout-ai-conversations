const getUserName = () => {
  const elem = document.querySelector(".gb_Ab");
  return elem?.textContent || "";
};

const getChatTitle = () => {
  // Bardには会話のタイトルがないので、最初の発言を採用する
  const uTextElem = document.querySelector(".user-query-container .query-text");
  return (uTextElem?.textContent || "No title").substring(0, 50);
};

const getChatContents = ({ userName, aiName }) => {
  const fmtSpaces = (str) => {
    return str.replace(/\s/g, "_");
  };

  const res = [];

  const convElems = document.querySelectorAll(".conversation-container");
  for (let i = 0; i < convElems.length; i++) {
    const convElem = convElems[i];
    const uqElem = convElem.querySelector(".user-query-container");
    const resElem = convElem.querySelector(".response-container");

    // ユーザーの発言
    const uTextElem = uqElem.querySelector(".query-text");
    const uText = uTextElem?.textContent || "";
    const uIcon = `[${fmtSpaces(userName)}.icon]`;
    res.push(`${uIcon} ${uText}`);

    // AIの回答
    const modelTextElem = resElem.querySelector(
      ".model-response-text .markdown"
    );
    const modelTextParagraphs = modelTextElem.children;
    const resTexts = [];
    for (let j = 0; j < modelTextParagraphs.length; j++) {
      const p = modelTextParagraphs[j];
      if (p.tagName === "UL" || p.tagName === "OL") {
        const liElems = p.querySelectorAll("li");
        for (let k = 0; k < liElems.length; k++) {
          const liText = liElems[k]?.textContent || "";
          resTexts.push(` ${liText}`);
        }
      } else if (p.tagName === "CODE-BLOCK") {
        const block = p.querySelector("div.code-block");
        // ファイル形式を示しているヘッダー部
        const header = block.querySelector("div.header");
        const headerText = header?.textContent || "";
        resTexts.push(`code:${headerText.toLowerCase()}`);
        // コード部
        const code = block.querySelector("pre");
        const codeTexts = (code?.textContent || "")
          .split("\n")
          .filter((text) => !!text);
        resTexts.push(...codeTexts.map((text) => ` ${text}`));
      } else {
        const resText = p?.textContent || "";
        resTexts.push(resText);
      }
    }
    // const resTexts = (resTextElem?.textContent || "").split("\n");
    const resIcon = `[${fmtSpaces(aiName)}.icon]`;
    res.push(resIcon, ...resTexts.map((text) => ` ${text}`), "");
  }

  return res;
};

export function extractBardTexts({ userName, bard }) {
  const consts = {
    userName: getUserName() || userName || "me",
    aiName: bard.aiName || "ai",
  };
  const title = getChatTitle();
  const contents = getChatContents(consts);
  return {
    title,
    contents,
    hashtagLine: bard.hashtagLine,
  };
}
