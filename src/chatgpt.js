const getNextjsPageProps = () => {
  const nextJsScript = document.querySelector("script#__NEXT_DATA__");
  const data = JSON.parse(nextJsScript?.textContent || "{}");
  return data.props?.pageProps || {};
};

const getChatTitle = () => {
  return document.querySelector("title").textContent;
};

const isUsedPluginsModel = () => {
  const mainHeader = document.querySelector("main div.w-full");
  if (!mainHeader) {
    return false;
  }
  const textLc = mainHeader.textContent.replace(/\s/gi, "").toLowerCase();
  return textLc.includes("model:plugins");
};

const getChatContents = ({ userName, aiName }, { user }) => {
  const isPluginsMode = isUsedPluginsModel();
  console.log("...", isPluginsMode);
  const res = [];
  const textElems = document.querySelectorAll("div.text-base");
  for (let i = 0; i < textElems.length; i++) {
    const textElem = textElems[i];
    // div.text-base要素内の2番目のdiv要素が本文
    const textContentElem =
      textElem.parentElement.querySelector("div.text-base div.markdown") ||
      textElem.parentElement.querySelector("div.text-base > div:nth-child(2)");

    const text = textContentElem.textContent;
    const svgElem = textElem.querySelector(".rounded-sm svg");
    const imgElem = textElem.querySelector("img[alt]:not([alt=''])");

    let speaker = userName;
    if (svgElem) {
      speaker = aiName;
    }
    if (imgElem && !userName) {
      speaker = user?.name || "me";
    }
    const icon = `[${speaker.replace(/\s/g, "_")}.icon]`;

    if (speaker === aiName) {
      const sents = text.split("\n");
      res.push(icon, ...sents.map((sent) => ` ${sent}`), "");
    } else {
      res.push(`${icon} ${text}`);
    }
  }
  return res;
};

export function extractChatGPTTexts({ userName, chatgpt }) {
  const props = getNextjsPageProps();
  const consts = {
    userName,
    aiName: chatgpt.aiName,
  };
  const title = getChatTitle();
  const contents = getChatContents(consts, props);
  return {
    title,
    contents,
    hashtagLine: chatgpt.hashtagLine,
  };
}
