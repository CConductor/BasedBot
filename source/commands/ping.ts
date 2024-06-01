import type { Client } from "discord.js"

import { BotMessage, MessagePrefix } from "../modules/BotMessage"
import { Command } from "../Command"
import CommandMessage from "../modules/CommandMessage"

class PingCommand extends Command {
  constructor() {
    super("ping", "Displays bot's ping")
  }

  public override async run(client: Client, commandMessage: CommandMessage) {
    const reply = await commandMessage.reply({
      content: BotMessage.create(MessagePrefix.PROCESS, "Pinging...")
    })

    const webSocketPing = client.ws.ping
    const apiPing = reply.createdTimestamp - commandMessage.message.createdTimestamp

    await reply.edit({
      content: [
        BotMessage.create(MessagePrefix.INFO, `WebSocket Ping: ${webSocketPing}ms`),
        BotMessage.create(MessagePrefix.INFO, `API/Client Ping: ${apiPing}ms`)
      ].join("\n")
    })
  }
}

export default new PingCommand()
