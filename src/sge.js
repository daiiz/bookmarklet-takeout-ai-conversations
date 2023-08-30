/**
 * Search Generative Experience
 * https://japan.googleblog.com/2023/08/search-sge.html
 */

export function extractSGETexts({ userName, sge }) {
  const consts = {
    userName: getUserName() || userName || "me",
    aiName: sge.aiName || "ai",
  };
  const title = getChatTitle();
  const contents = getChatContents(consts);
  return {
    title,
    contents,
    hashtagLine: sge.hashtagLine,
  };
}
