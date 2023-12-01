import { NewableMessage, NewableMessageHandler } from "../../types";
import { RegistryError } from "./registry-error.exception";

export class AlreadyRegisteredRegistryError extends RegistryError {
  public code = "already_registered_registry_error";

  public constructor(
    handlerConstructor: NewableMessageHandler,
    message: NewableMessage
  ) {
    super({
      errorMessage: `Failed to register ${
        handlerConstructor.name
      } to ${message.getName()}. Handler for ${message.getName()} already registered`,
      subjectOrConstructor: handlerConstructor,
      registrationKey: message.getName(),
    });
  }
}
