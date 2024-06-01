import { Client, Message } from "discord.js"

import { CommandList } from "../Command"
import { BotMessage, MessagePrefix } from "../modules/BotMessage"
import { DEFAULT_FLAG_VALUE } from "../modules/CommandMessage"
import CommandMessage from "../modules/CommandMessage"
import * as config from "../../config.json"

export default (client: Client) => {
  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(config.prefix)) return

    await handleCommand(client, message)
  })
}

const parseCommand = (message: Message): CommandMessage => {
  const parts = message.content.trim().match(/(?:[^\s"]+|"[^"]*")+/g) || []

  const commandMessage = CommandMessage.create({
    name: parts[0]!.slice(1),
    message,
    args: [],
    flags: {}
  })

  const parseFlag = (part: string) => {
    const flagParts = part.slice(2).split("=")
    const flagName = flagParts[0]
    const flagValue = flagParts.slice(1).join("=").toLowerCase()

    if (flagParts.length === 1) {
      commandMessage.flags[flagName] = DEFAULT_FLAG_VALUE
      return
    }

    if (!isNaN(parseFloat(flagValue))) {
      commandMessage.flags[flagName] = parseFloat(flagValue)
      return
    }

    if (["true", "false"].includes(flagValue)) {
      return /true/.test(flagValue)
    }

    commandMessage.flags[flagName] = flagValue
  }

  for (const part of parts.slice(1)) {
    const partIsInQuotes = /^".*"$/.test(part)
    commandMessage.args.push(partIsInQuotes ? part.slice(1, -1) : part)

    if (part.startsWith("--")) {
      parseFlag(part)
      continue
    }
  }

  return commandMessage
}

const handleCommand = async (client: Client, message: Message): Promise<void> => {
  const targetCommand = message.content.split(/\s+/)[0].slice(1)
  const command = CommandList.find((command) => command.name === targetCommand || command.settings?.aliases?.includes(targetCommand))
  const sendError = (text: string) => message.reply(new BotMessage(MessagePrefix.ERROR, text).toString())

  if (!command) {
    sendError("This command doesn't exist")
    return
  }

  if (command.settings?.ownerOnly && !config.admins.includes(message.author.id)) {
    sendError("Only bot creators can run this command")
    return
  }

  if (command.settings?.requiredPermissions && !message.member?.permissions.has(command.settings?.requiredPermissions)) {
    sendError(`You don't have the next permission(-s): \`${command.settings?.requiredPermissions.join(", ")}\``)
    return
  }

  command.run(client, parseCommand(message))
}
