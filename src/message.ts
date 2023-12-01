/**
 * Abstract base class for messages.
 */
export abstract class Message {
  public abstract getName: () => string;
  public abstract getVersion: () => string;
}
