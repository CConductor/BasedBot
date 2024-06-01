import GeodeList from "../GeodeList"

export interface Geode {
  name: string
  location: string
  price: GeodePrice
  // oh man
  drops: ReadonlyArray<GeodeDrop>
}

export interface GeodePrice {
  stat: string
  amount: number
}

export interface GeodeDrop {
  stat: string
  odds: number
}

export type GeodeName = typeof GeodeList[number]["name"]

export const getGeodeNames = () => GeodeList.map((geode) => geode.name)
export const getGeodeByName = (name: GeodeName | (string & {})): Geode | undefined => GeodeList.find((geode) => geode.name === name)
