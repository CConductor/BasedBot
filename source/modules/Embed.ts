import { EmbedBuilder } from "discord.js"
import type { APIEmbed, EmbedData } from "discord.js"

import * as config from "../../config.json"

export class Embed extends EmbedBuilder {
  constructor(data?: APIEmbed | EmbedData | undefined) {
    super(data)
    this.setColor(config.embedColor)
  }

  public setDescriptionTitle(title: string): this {
    this.setDescription([
      `# ${title}\n`,
      this.data.description ?? ""
    ])

    return this
  }

  public setDescription(description: string | Array<string> | null): this {
    this.setDescription(Array.isArray(description) ? description.join("\n") : description)

    return this
  }
}
