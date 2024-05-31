import { readdirSync } from "node:fs"
import { Client } from "discord.js"
import * as path from "path"

import Logger from "../Logger"
import { CommandList } from "../Command"

export default (client: Client) => {
  client.once("ready", async () => {
    if (!client.user || !client.application) return

    await setupCommands()
    Logger.info(`Loaded ${CommandList.length} commands!`)
    Logger.info(`Logged in as ${client.user.username}`)
  })
}

const setupCommands = async () => {
  const commandFolder = path.join(__dirname, "..", "commands")
  const commandFiles = readdirSync(commandFolder)
    .filter(fileName => fileName.endsWith(".ts"))

  for (const file of commandFiles) {
    const filePath = path.join(commandFolder, file)
    await import(filePath)
  }
}
