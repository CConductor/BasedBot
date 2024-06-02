const BASE_WIKI_LINK = "https://button-simulatored.fandom.com/wiki/"

export const getWikiLink = (name: string) => BASE_WIKI_LINK.concat(name.replace(/ +/g, "_"))
export const getWikiArticle = (name: string) => `[${name}](<${getWikiLink(name)}>)`
