const getUserName = () => {
  const elem = document.querySelector(".gb_Ab");
  return elem?.textContent || "";
};

const getChatTitle = () => {
  // Bardには会話のタイトルがないので、最初の発言の冒頭30文字を採用する
  const uTextElem = document.querySelector(".user-query-container .query-text");
  return (uTextElem?.textContent || "No title").substring(0, 30);
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
    const modelTextElem = resElem.querySelector(".model-response-text");
    const modelTextParagraphs = modelTextElem.querySelectorAll("p");
    const resTexts = [];
    for (let j = 0; j < modelTextParagraphs.length; j++) {
      const p = modelTextParagraphs[j];
      const resText = p?.textContent || "";
      resTexts.push(resText);
    }
    // const resTexts = (resTextElem?.textContent || "").split("\n");
    const resIcon = `[${fmtSpaces(aiName)}.icon]`;
    res.push(resIcon, ...resTexts.map((text) => ` ${text}`), "");
  }

  return res;
};

export function extractBardTexts({ userName, bard }) {
  const consts = {
    userName: getUserName() || userName,
    aiName: bard.aiName,
  };
  const title = getChatTitle();
  const contents = getChatContents(consts);
  return {
    title,
    contents,
    hashtagLine: bard.hashtagLine,
  };
}
