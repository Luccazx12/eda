import { RegistryError } from './registry-error.exception';

export class NotRegisteredRegistryError extends RegistryError {
  public code = 'not_registered_registry_error';

  public constructor(relatedKey: string) {
    super({
      errorMessage: `There is no registered handler related to key ${relatedKey}`,
      registrationKey: relatedKey,
    });
  }
}
