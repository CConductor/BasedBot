import * as GeodeData from "../../geodes.json" assert { type: "json" }

export const GeodeList = GeodeData as ReadonlyArray<Geode>

export interface Geode {
  name: string
  location: string
  price: GeodePrice
  drops: Array<GeodeDrop>
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

export const getGeodeNames = (): Array<GeodeName> => GeodeList.map((geode) => geode.name)
export const getGeodeByName = (name: GeodeName): Geode | undefined => GeodeList.find((geode) => geode.name === name)
