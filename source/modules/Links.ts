const BASE_WIKI_LINK = "https://button-simulatored.fandom.com/wiki/"

export const getWikiArticle = (name: string): string =>
  // I don't think there's any article names that contain special characters
  `[${name}](<${BASE_WIKI_LINK.concat(name.replace(/ +/g, "_"))}>)`
