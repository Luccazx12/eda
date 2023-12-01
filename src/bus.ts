import { Message } from './message';
import { Handler } from './handler';
import { NewableMessage } from './types';

/**
 * Represents data required when adding a subscriber to the bus.
 */
export interface AddSubscriberData {
  messageConstructor: NewableMessage;
  handler: Handler<Message>;
}

/**
 * Interface for a Bus, responsible for dispatching messages.
 */
export interface Bus {
  /**
   * Dispatches one or more messages through the bus.
   * @param message The message or array of messages to dispatch.
   * @returns A Promise that resolves when the dispatch operation is completed.
   */
  dispatch(message: Message | Message[]): Promise<any>;
}

/**
 * The abstract class SubscriptionBus defines the basic structure of a subscription bus.
 * A subscription bus allows the publication of messages and the addition of subscribers
 * to process these messages. It implements the Bus interface.
 */
export abstract class SubscriptionBus implements Bus {
  /**
   * Abstract method to dispatch a message or a list of messages.
   * It must be implemented in child classes to provide the actual dispatch logic.
   * @param message The message or list of messages to be dispatched.
   * @returns A Promise that is resolved after the completion of message dispatch.
   */
  abstract dispatch(message: Message | Message[]): Promise<void>;

  /**
   * Abstract method to add a subscriber for a specific message.
   * It must be implemented in child classes to provide the subscriber addition logic.
   * @param data Data containing the message constructor and the handler to be added.
   */
  abstract addSubscriber(data: AddSubscriberData): void;
}
