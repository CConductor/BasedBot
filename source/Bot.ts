import { Client, GatewayIntentBits } from "discord.js"
import * as dotenv from "dotenv"

import ready from "./events/ready"
import messageCreate from "./events/messageCreate"

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

ready(client)
messageCreate(client)

client.login(process.env.DISCORD_TOKEN)
