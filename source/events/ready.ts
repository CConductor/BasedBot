import { Client } from "discord.js"
import { readdirSync } from "node:fs"
import * as path from "path"

import { CommandList } from "../Command"
import Logger from "../Logger"

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
  const commandFiles = readdirSync(commandFolder).filter((fileName) => fileName.endsWith(".ts"))

  commandFiles.forEach(async (file) => await import(path.join(commandFolder, file)))
}
