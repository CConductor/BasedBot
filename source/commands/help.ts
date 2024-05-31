import { EmbedBuilder, type Client } from "discord.js"

import { Command, CommandList } from "../Command"
import type { CommandMessage } from "../modules/CommandMessage"
import * as config from "../../config.json"

class HelpCommand extends Command {
  constructor() {
    super("help", "Shows the commands that the bot has")
  }

  public override async run(client: Client, commandMessage: CommandMessage) {
    const embedDescriptionLines = CommandList.map((command) => `- \`${command.name}\` - ${command.description}`)
    embedDescriptionLines.unshift(`# ${client.user?.username}'s command list`)

    const embed = new EmbedBuilder()
      .setDescription(embedDescriptionLines.join("\n"))
      .setColor(config.embedColor)

    await commandMessage.message.reply({ embeds: [embed] })
  }
}

export default new HelpCommand()
