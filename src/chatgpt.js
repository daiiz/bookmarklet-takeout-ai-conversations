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

// BETA
const getPluginNames = (textElem, rootClassName) => {
  const textContentElem = textElem.parentElement.querySelector(rootClassName);
  const target = textContentElem.querySelector("div.flex-col.items-start");
  if (!target || target.classList.contains("whitespace-pre-wrap")) {
    return [];
  }
  const textContent = target.textContent;
  // TDOO: 複数のプラグインが一度に利用された場合の対応
  const names = textContent
    .replace(/^used\s+/gi, "")
    .split(/[,\s]/)
    .map((x) => x.trim())
    .filter((x) => !!x);
  return names;
};

const getChatContents = ({ userName, aiName }, { user }) => {
  const isPluginsMode = isUsedPluginsModel();
  const res = [];
  const textElems = document.querySelectorAll("div.text-base");
  for (let i = 0; i < textElems.length; i++) {
    const textElem = textElems[i];
    // div.text-base要素内の2番目のdiv要素が本文
    const rootClassName = "div.text-base > div:nth-child(2)";
    const textContentElem =
      textElem.parentElement.querySelector("div.text-base div.markdown") ||
      textElem.parentElement
        .querySelector(rootClassName)
        .querySelector("div.whitespace-pre-wrap");

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

    const plugins = [];
    if (isPluginsMode) {
      plugins.push(...getPluginNames(textElem, rootClassName));
    }

    let icon = `[${speaker.replace(/\s/g, "_")}.icon]`;
    if (plugins.length > 0) {
      icon += ` Used ${plugins.join(", ")}`;
    }

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
