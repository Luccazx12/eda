import { Bus, SubscriptionBus } from '../bus';
import { NewableMessage, NewableMessageHandler, MessageHandler } from '../types';
import { AlreadyRegisteredRegistryError, NotRegisteredRegistryError, NotFoundRegistryError } from './exceptions';


@final
export class HandlerRegistry {
  // Static map to store message handlers
  public static readonly map: ExtendedMap<
    NewableMessage,
    Array<NewableMessageHandler>
  > = new ExtendedMap();

  /**
   * Registers a message handler in the registry.
   * @param message The constructor of the message to be handled.
   * @param handlerConstructor The constructor of the message handler.
   * @param isSingleHandler Indicates whether only a single handler is allowed for the message.
   * @throws AlreadyRegisteredRegistryError if the handler is already registered for the message.
   */
  public static registerHandler(
    message: NewableMessage,
    handlerConstructor: NewableMessageHandler,
    isSingleHandler = true,
  ): void {
    const handlerConstructors = this.map.getOrDefault(message, []);

    if (
      handlerConstructors.includes(handlerConstructor) ||
      (isSingleHandler && this.map.has(message))
    ) {
      throw new AlreadyRegisteredRegistryError(handlerConstructor, message);
    }

    handlerConstructors.push(handlerConstructor);
    this.map.set(message, handlerConstructors);
  }

  /**
   * Gets the first handler for a given message name.
   * @param messageName The name of the message to find the handler for.
   * @returns The first message handler for the given message name.
   * @throws NotRegisteredRegistryError if no handlers are registered for the message.
   */
  public static getHandler(messageName: string): MessageHandler {
    return this.getHandlers(messageName)[0];
  }

  /**
   * Gets all handlers for a given message name.
   * @param messageName The name of the message to find handlers for.
   * @returns An array of message handlers for the given message name.
   * @throws NotRegisteredRegistryError if no handlers are registered for the message.
   */
  public static getHandlers(messageName: string): MessageHandler[] {
    const entries = Array.from(this.map.entries()).filter(
      ([message]) => message.getName() === messageName,
    );

    if (entries.length < 1) throw new NotRegisteredRegistryError(messageName);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return entries.map(([_, [handlerConstructor]]) =>
      this.getEventHandlerByConstructor(handlerConstructor),
    );
  }

  /**
   * Gets a message handler instance by its constructor.
   * @param handlerConstructor The constructor of the message handler.
   * @returns An instance of the message handler.
   * @throws NotFoundRegistryError if the handler instance cannot be obtained.
   */
  private static getEventHandlerByConstructor(
    handlerConstructor: NewableMessageHandler,
  ): MessageHandler {
    const eventHandler = Container.get<MessageHandler>(handlerConstructor);

    if (eventHandler.isNone()) {
      throw new NotFoundRegistryError(handlerConstructor);
    }

    return eventHandler.unwrap();
  }

  /**
   * Triggers the addition of message handlers to a subscription bus.
   * @param bus The subscription bus to which handlers should be added.
   */
  public static triggerHandlers(bus: Bus): void {
    if (bus instanceof SubscriptionBus) {
      this.map.forEach((handlerConstructors, messageConstructor) => {
        handlerConstructors.forEach((handlerConstructor) => {
          const handler = this.getEventHandlerByConstructor(handlerConstructor);
          bus.addSubscriber({ messageConstructor, handler });
        });
      });
    }
  }
}
