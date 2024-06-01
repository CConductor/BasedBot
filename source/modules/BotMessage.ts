export enum MessagePrefix {
  SUCCESS = "`✅ OK`",
  INFO = "`🔵 INFO`",
  WARNING = "`⚠️ WARN`",
  ERROR = "`❌ ERROR`",
  PROCESS = "`⌚ WAIT`",
  DEBUG = "`🚧 DEBUG`"
}

export class BotMessage {
  public readonly prefix: MessagePrefix
  public readonly message: string

  constructor(prefix: MessagePrefix, message: string) {
    this.prefix = prefix
    this.message = message
  }

  public toString(): string {
    return `${this.prefix} ${this.message}`
  }

  static create(prefix: MessagePrefix, message: string): string {
    return new BotMessage(prefix, message).toString()
  }
}
