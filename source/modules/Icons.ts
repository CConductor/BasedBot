import IconLinks from "../data/IconLinks"

export type IconName = keyof typeof IconLinks

export const getIconByName = (name: IconName) => IconLinks[name]
