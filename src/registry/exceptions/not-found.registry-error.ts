import { NewableMessageHandler } from "../../types";
import { RegistryError } from "./registry-error.exception";

export class NotFoundRegistryError extends RegistryError {
  public code = "not_found_registry_error";

  public constructor(
    handlerConstructor: NewableMessageHandler,
    errorMessage?: string
  ) {
    super({
      errorMessage:
        errorMessage ?? `Handler ${handlerConstructor.name} not found.`,
      subjectOrConstructor: handlerConstructor,
    });
  }
}
