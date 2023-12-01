import { HandlerRegistry } from "../registry/handler-registry";
import { NewableMessage, NewableMessageHandler } from "../types";

/**
 * Decorator function for registering a message handler for one or more messages in the HandlerRegistry.
 * @param messages One or more message constructors to associate with the message handler.
 * @returns A decorator function that takes a message handler constructor and registers it for the specified messages.
 */
export function Handler<T extends NewableMessage>(
  ...messages: T[]
): <T extends NewableMessageHandler>(handlerConstructor: T) => T {
  return function classDecorator<T extends NewableMessageHandler>(
    handlerConstructor: T
  ): T {
    messages.forEach((message) =>
      HandlerRegistry.registerHandler(message, handlerConstructor, false)
    );
    return handlerConstructor;
  };
}
