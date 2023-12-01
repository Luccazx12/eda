import { Message } from './message';

/**
 * Interface for a message handler.
 * @typeparam M - The type of message that the handler can handle.
 */
export interface Handler<M extends Message> {
  /**
   * Handles a message.
   * @param message The message to handle.
   * @returns A Promise representing the result of handling the message.
   */
  handle(message: M): Promise<any>;
}
