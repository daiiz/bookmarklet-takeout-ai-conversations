const yourName = ""; // Please change to your name
const chatgptName = "chatgpt";
const hashtagLine = "#ChatGPT日記"; // Please change to your favaorite hashtags

const getNextjsProps = () => {
  const nextJsScript = document.querySelector("script#__NEXT_DATA__");
  const data = JSON.parse(nextJsScript?.textContent || "{}");
  return data.props?.pageProps || {};
};

const getChatTitle = () => {
  return document.querySelector("title").textContent;
};

const getChatContents = ({ user }) => {
  const res = [];
  const textElems = document.querySelectorAll("div.text-base");
  for (let i = 0; i < textElems.length; i++) {
    const textElem = textElems[i];
    // div.text-base要素内の2番目のdiv要素が本文
    const text = textElem.parentElement.querySelector(
      "div.text-base > div:nth-child(2)"
    ).textContent;
    const svgElem = textElem.querySelector(".rounded-sm svg");
    const imgElem = textElem.querySelector("img[alt]:not([alt=''])");

    let speaker = yourName;
    if (svgElem) {
      speaker = chatgptName;
    }
    if (imgElem && !yourName) {
      speaker = user?.name || "me";
    }
    const icon = `[${speaker.replace(/\s/g, "_")}.icon]`;

    if (speaker === chatgptName) {
      const sents = text.split("\n");
      res.push(icon, ...sents.flatMap((sent) => ` ${sent}`), "");
    } else {
      res.push(`${icon} ${text}`);
    }
  }
  return res;
};

const createScrapboxLines = () => {
  const props = getNextjsProps();
  const res = [];
  const title = getChatTitle();
  const contents = getChatContents(props);
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

copyToClipboard(createScrapboxLines().join("\n"));
