import { EmbedBuilder } from "discord.js"
import type { Client } from "discord.js"

import { BotMessage } from "../modules/BotMessage"
import { Command } from "../Command"
import type { CommandMessage } from "../modules/CommandMessage"
import Geodes from "../../geodes.json"
import NumberFormat from "../modules/NumberFormat"
import * as config from "../../config.json"

interface Geode {
  name: string
  location: string
  price: GeodePrice
  drops: Array<GeodeDrop>
}

interface GeodePrice {
  stat: string
  amount: number
}

interface GeodeDrop {
  stat: string
  odds: number
}

const BASE_WIKI_LINK = "https://button-simulatored.fandom.com/wiki/"
const INVALID_GEODE_NAME = "Invalid geode name, did you spell it correctly? Example usage: `$geode Stone`, `$geode \"White Gems\"` (note that you don\'t type \"Geode\")"

class GeodeCommand extends Command {
  constructor() {
    super("geode", "Shows the drops from a geode")
  }

  public override async run(_: Client, commandMessage: CommandMessage) {
    if (Object.hasOwn(commandMessage.flags, "list")) {
      const nameList = `\\- ${this.getGeodeNames()
        .map((name) => name.concat(" Geode"))
        .join("\n\\- ")}`
      const message = BotMessage.info(`Here's the available geode list:\n${nameList}`)

      await commandMessage.message.reply(message)
      return
    }

    if (commandMessage.args.length !== 1) {
      await commandMessage.message.reply(BotMessage.error("Incorrect argument count, expected 1"))
      return
    }

    const geodeName = commandMessage.args[0]
    const longNumbers = Object.hasOwn(commandMessage.flags, "longNumbers")

    if (!this.getGeodeNames().includes(geodeName)) {
      await commandMessage.message.reply(BotMessage.error(INVALID_GEODE_NAME))
      return
    }

    const targetGeode: Geode = Geodes.find((geode) => geode.name === geodeName)!
    await commandMessage.message.reply({ embeds: [this.getGeodeEmbed(targetGeode, longNumbers)] })
  }

  private getGeodeNames(): Array<string> {
    return Geodes.map((geode) => geode.name)
  }

  private getWikiArticle(name: string): string {
    return `[${name}](<${BASE_WIKI_LINK.concat(name.replace(/ +/g, "_"))}>)`
  }

  private getGeodeEmbed(geode: Geode, longNumbers: boolean): EmbedBuilder {
    const dropList = `- ${geode.drops
      .map((drop) => `${this.getWikiArticle(drop.stat)} \`(1/${NumberFormat(drop.odds, longNumbers)})\``)
      .join("\n- ")}`
    const descriptionLines = [
      `# ${geode.name.concat(" Geode Button")}`,
      `**Price**: ${NumberFormat(geode.price.amount, longNumbers)} ${this.getWikiArticle(geode.price.stat)}`,
      `**Location:** ${geode.location}`,
      `**Drops:**\n${dropList}`
    ]

    return new EmbedBuilder()
      .setDescription(descriptionLines.join("\n"))
      .setColor(config.embedColor)
  }
}

export default new GeodeCommand()
