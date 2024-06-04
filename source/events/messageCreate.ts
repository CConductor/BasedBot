import { Client, Message } from "discord.js"

import { CommandList } from "../Command"
import { BotMessage, MessagePrefix } from "../modules/BotMessage"
import { parseCommand } from "../modules/CommandMessage"
import * as config from "../../config.json"

export default (client: Client) => {
  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(config.prefix)) return

    await handleCommand(client, message)
  })
}

const handleCommand = async (client: Client, message: Message) => {
  const targetCommand = message.content.split(/\s+/)[0].slice(1)
  const command = CommandList.find((command) => command.name === targetCommand || command.settings?.aliases?.includes(targetCommand))
  const sendError = (text: string) => message.reply(BotMessage.create(MessagePrefix.ERROR, text))

  if (!command) {
    return sendError("This command doesn't exist")
  }

  if (!command.settings) {
    return command.run(client, parseCommand(message))
  }

  const { ownerOnly, requiredPermissions } = command.settings

  if (ownerOnly && !config.admins.includes(message.author.id)) {
    return sendError("Only bot creators can run this command")
  }

  if (requiredPermissions && !message.member?.permissions.has(requiredPermissions)) {
    return sendError(`You don't have the next permission(-s): \`${requiredPermissions.join(", ")}\``)
  }

  command.run(client, parseCommand(message))
}
