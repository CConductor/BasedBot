import { Client, GatewayIntentBits } from "discord.js"
import type { ClientEvents } from "discord.js"
import { readdirSync } from "node:fs"
import * as dotenv from "dotenv"
import * as path from "path"
import Logger from "./Logger"

dotenv.config()

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions
  ],
  allowedMentions: {
    repliedUser: false
  }
})

// Copied from thje command handler lolll
const setupEvents = (events: Array<keyof ClientEvents>): number => {
  const eventFolder = path.join(__dirname, "events")
  const eventFiles = readdirSync(eventFolder)

  events.filter((event) => eventFiles.find((fileName) => fileName === `${event}.ts`))
  eventFiles.forEach((eventFile) => {
    import(path.join(eventFolder, eventFile)).then((event) => event.default(client))
  });

  return events.length
}

const eventAmount = setupEvents(["ready", "messageCreate"])
Logger.info(`Listening to ${eventAmount} events!`)

client.login(process.env.DISCORD_TOKEN)
