import type { Client } from "discord.js"

import { BotMessage, MessagePrefix as Prefix } from "../modules/BotMessage"
import { Embed } from "../modules/Embed"
import { Command } from "../Command"
import type { Geode, GeodeDrop } from "../modules/Geodes"
import CommandMessage from "../modules/CommandMessage"
import NumberFormat from "../modules/NumberFormat"

import * as Links from "../modules/Links"
import * as Geodes from "../modules/Geodes"

const INVALID_GEODE_NAME =
  'Invalid geode name, did you spell it correctly? Example usage: `$geode Stone`, `$geode "White Gems"` (note that you don\'t type "Geode")'

class GeodeCommand extends Command {
  constructor() {
    super("geode", "Shows the drops from a geode")
  }

  public override async run(_: Client, commandMessage: CommandMessage) {
    if (commandMessage.hasFlag("list")) {
      const nameList = Geodes.getGeodeNames().join(" Geode, ")
      const message = BotMessage.create(Prefix.INFO, `**Here's the available geode list:** ${nameList}`)

      await commandMessage.reply(message)
      return
    }

    if (commandMessage.args.length !== 1) {
      await commandMessage.reply(BotMessage.create(Prefix.ERROR, "Incorrect argument count, expected 1"))
      return
    }

    const geodeName = commandMessage.args[0]
    const longNumbers = commandMessage.hasFlag("long-numbers")
    const targetGeode = Geodes.getGeodeByName(geodeName)

    if (!targetGeode) {
      await commandMessage.reply(BotMessage.create(Prefix.ERROR, INVALID_GEODE_NAME))
      return
    }

    await commandMessage.replyWithEmbed(this.getGeodeEmbed(targetGeode, longNumbers))
  }

  private getGeodeEmbed(geode: Geode, longNumbers: boolean): Embed {
    const geodePrice = `${NumberFormat(geode.price.amount, longNumbers)} ${Links.getWikiArticle(geode.price.stat)}`
    const dropList = geode.drops.map((drop: GeodeDrop) => {
      const stat = Links.getWikiArticle(drop.stat)
      const odds = NumberFormat(drop.odds, longNumbers)

      return `\`[1/${odds}]\` ${stat}`
    })

    return new Embed()
      .setDescriptionTitle(geode.name.concat(" Geode Button"))
      .setDescription([
        `**Price**: ${geodePrice}`,
        `**Location:** ${geode.location}`,
        `**Drops:**\n${dropList.join("\n")}`
      ])
  }
}

export default new GeodeCommand()
