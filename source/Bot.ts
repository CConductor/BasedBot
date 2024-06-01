import { Client, GatewayIntentBits } from "discord.js"
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
const setupEvents = async (): Promise<number> => {
  const eventFolder = path.join(__dirname, "events")
  const eventFiles = readdirSync(eventFolder).filter((fileName) => fileName.endsWith(".ts"))

  eventFiles.forEach(async (file) => await import(path.join(eventFolder, file)).then((event) => event.default(client)))
  return eventFiles.length
}

await setupEvents()
  .then((eventCount) => Logger.info(`Listening to ${eventCount} events!`))
  .catch(Logger.error)

client.login(process.env.DISCORD_TOKEN)
