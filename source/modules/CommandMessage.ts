import { Message } from "discord.js"

export type FlagValue = string | number | boolean
export type Flags = Record<string, FlagValue>

export interface CommandMessage {
  name: string
  args: Array<string>
  flags: Flags
  message: Message
}

export const DefaultFlagValue = true
