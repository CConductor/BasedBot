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

  static createMessage(prefix: MessagePrefix, message: string): string {
    return new BotMessage(prefix, message).toString()
  }

  static info(message: string): string {
    return new BotMessage(MessagePrefix.INFO, message).toString()
  }

  static success(message: string): string {
    return new BotMessage(MessagePrefix.SUCCESS, message).toString()
  }

  static error(message: string): string {
    return new BotMessage(MessagePrefix.ERROR, message).toString()
  }
}
