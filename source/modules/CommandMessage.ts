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

  public reply(options: string | MessagePayload | MessageReplyOptions): Promise<Message<boolean>> {
    return this.message.reply(options)
  }

  public replyWithEmbed(embed: Embed | Array<Embed>): Promise<Message<boolean>> {
    return this.reply({ embeds: Array.isArray(embed) ? embed : [embed] })
  }
}
