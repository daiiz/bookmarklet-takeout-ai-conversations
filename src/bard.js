const getUserName = () => {
  const elem = document.querySelector(".gb_Ab");
  return elem?.textContent || "";
};

const getChatTitle = () => {
  // Bardには会話のタイトルがないので、最初の発言の冒頭30文字を採用する
  const uQElem = document.querySelector(".user-query-container .query-text");
  return (uQElem?.textContent || "No title").substring(0, 30);
};

const getChatContents = ({ userName, aiName }) => {
  /**
   * @type {string[]}
   */
  const res = [];
};

export function extractBardTexts({ userName, bard }) {
  const consts = {
    userName: getUserName() || userName,
    aiName: bard.aiName,
  };
  const title = getChatTitle();
  const contents = getChatContents(consts);
  console.log("....", consts, title, contents);
  return {
    title,
    contents,
    hashtagLine: bard.hashtagLine,
  };
}
