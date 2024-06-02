import type { Client } from "discord.js"

import { Command } from "../Command"
import { Embed } from "../modules/Embed"
import CommandMessage from "../modules/CommandMessage"
import * as Icons from "../modules/Icons"
import * as Links from "../modules/Links"

class RelicticVoluspaCommand extends Command {
  constructor() {
    super("relictic-voluspa", "Relictic Volùspa")
  }

  public override async run(_: Client, commandMessage: CommandMessage) {
    const embed = new Embed()
      .setAuthor({
        "name": "Relictic Volùspa",
        "iconURL": Icons.getIconByName("Relictic Volùspa"),
        "url": Links.getWikiLink("Relictic Volùspa")
      })
      .setColor(0xC00808)
      .setTitle("Relictic Volùspa")
      .setDescriptionTitle("Relictic Volùspa")
      .setDescription("Relictic Volùspa")
      .setImage(Icons.getIconByName("Relictic Volùspa"))
      .setURL(Links.getWikiLink("Relictic Volùspa"))
      .setThumbnail(Icons.getIconByName("Relictic Volùspa"))
      .setFooter({
        "text": "Relictic Volùspa",
        "iconURL": Icons.getIconByName("Relictic Volùspa")
      })

    await commandMessage.replyWithEmbed(embed)
  }
}

export default new RelicticVoluspaCommand()
