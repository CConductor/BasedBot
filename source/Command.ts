import { Client } from "discord.js"
import type { BaseApplicationCommandData, PermissionFlagsBits } from "discord.js"

import type { CommandMessage } from "./modules/CommandMessage"

export const CommandList: Array<Command> = []

export abstract class Command implements BaseApplicationCommandData {
  public name: string
  public description: string
  public settings: CommandSettings | null

  constructor(name: string, description: string, settings?: CommandSettings) {
    this.name = name
    this.description = description
    this.settings = settings ?? {}

    CommandList.push(this)
  }

  public abstract run(client: Client, commandMessage: CommandMessage): Promise<void>
}

export interface CommandSettings {
  ownerOnly?: boolean
  requiredPermissions?: Array<keyof typeof PermissionFlagsBits>
  aliases?: Array<string>
}
