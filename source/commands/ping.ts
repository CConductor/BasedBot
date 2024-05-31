import type { Client } from "discord.js"

import { BotMessage, MessagePrefix } from "../modules/BotMessage"
import { Command } from "../Command"
import type { CommandMessage } from "../modules/CommandMessage"

class PingCommand extends Command {
  constructor() {
    super("ping", "Displays bot's ping")
  }

  public override async run(client: Client, commandMessage: CommandMessage) {
    const reply = await commandMessage.message.reply({
      content: BotMessage.createMessage(MessagePrefix.PROCESS, "Pinging...")
    })

    const webSocketPing = client.ws.ping
    const apiPing = reply.createdTimestamp - commandMessage.message.createdTimestamp

    await reply.edit({
      content: [
        BotMessage.createMessage(MessagePrefix.INFO, `WebSocket Ping: ${webSocketPing}ms`).toString(),
        BotMessage.createMessage(MessagePrefix.INFO, `API/Client Ping: ${apiPing}ms`).toString()
      ].join("\n")
    })
  }
}

export default new PingCommand()
