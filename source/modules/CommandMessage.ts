import { Message, MessagePayload } from "discord.js"
import type { MessageReplyOptions } from "discord.js"

import type { Embed } from "./Embed"

export type FlagValue = string | number | boolean
export type Flags = Record<string, FlagValue>

export const DEFAULT_FLAG_VALUE = true

interface CommandMessageObject {
  name: string
  args: Array<string>
  flags: Flags
  message: Message
}

const stringIsInQuotes = (text: string) => /^".*"$/.test(text)

const parseFlag = (part: string, flags: Flags) => {
  const [flagName, ...flagValueParts] = part.slice(2).split("=")
  const flagValue = flagValueParts.join("=").toLowerCase()

  const parsedValue = Number(flagValue)

  if (flagValueParts.length === 0) {
    flags[flagName] = DEFAULT_FLAG_VALUE
  } else if (!Number.isNaN(parsedValue)) {
    flags[flagName] = parsedValue
  } else if (flagValue === "true" || flagValue === "false") {
    flags[flagName] = flagValue === "true"
  } else {
    flags[flagName] = flagValue
  }
}

export const parseCommand = (message: Message) => {
  const parts = message.content.trim().match(/(?:[^\s"]+|"[^"]*")+/g) || []

  const commandMessage = CommandMessage.create({
    name: parts[0]!.slice(1),
    message,
    args: [],
    flags: {}
  })

  parts.slice(1).forEach((part) => {
    if (part.startsWith("--")) {
      parseFlag(part, commandMessage.flags)
      return
    }

    commandMessage.args.push(stringIsInQuotes(part) ? part.slice(-1, 1) : part)
  })

  return commandMessage
}

export default class CommandMessage {
  public name: string
  public args: Array<string>
  public flags: Flags
  public message: Message

  private constructor({ name, args, flags, message }: CommandMessageObject) {
    this.name = name
    this.args = args
    this.flags = flags
    this.message = message
  }

  static create(commandMessage: CommandMessageObject) {
    return new CommandMessage(commandMessage)
  }

  public hasFlag(name: string): boolean {
    return Object.hasOwn(this.flags, name)
  }

  public async reply(options: string | MessagePayload | MessageReplyOptions): Promise<Message<boolean>> {
    return this.message.reply(options)
  } 

  public async replyWithEmbed(embed: Embed | Array<Embed>): Promise<Message<boolean>> {
    return this.message.reply({ embeds: Array.isArray(embed) ? embed : [embed] })
  }
}
