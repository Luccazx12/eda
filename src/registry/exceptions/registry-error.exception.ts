import { Message } from "../../message";
import { Handler } from "../../handler";
import { NewableMessageHandler } from "../../types";

type RegistrationKey = string;

interface RegistryErrorProps {
  errorMessage: string;
  registrationKey?: RegistrationKey;
  subjectOrConstructor?: RegistrySubjectOrConstructor;
}

export type RegistrySubjectOrConstructor =
  | Handler<Message>
  | NewableMessageHandler;

export abstract class RegistryError /*extends ExceptionBase*/ {
  public registrationKey?: RegistrationKey;

  public subjectOrConstructor?: RegistrySubjectOrConstructor;

  public constructor(props: RegistryErrorProps) {
    // super({
    //   message: props.errorMessage,
    //   metadata: {
    //     registrationKey: props.registrationKey,
    //     subjectOrConstructor: props.subjectOrConstructor,
    //   },
    // });
    this.registrationKey = props.registrationKey;
    this.subjectOrConstructor = props.subjectOrConstructor;
  }
}
