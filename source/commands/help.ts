import type { Client } from "discord.js"

import { Command, CommandList } from "../Command"
import CommandMessage from "../modules/CommandMessage"
import { Embed } from "../modules/Embed"

class HelpCommand extends Command {
  constructor() {
    super("help", "Shows the commands that the bot has")
  }

  public override async run(client: Client, commandMessage: CommandMessage) {
    const embedDescriptionLines = CommandList.map((command) => `- \`${command.name}\` - ${command.description}`)
    const embed = new Embed()
      .setDescriptionTitle(`${client.user!.username}'s command list`)
      .setDescription(embedDescriptionLines)

    await commandMessage.replyWithEmbed(embed)
  }
}

export default new HelpCommand()
