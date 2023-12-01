// import { ApplicationContext } from "@libs/application-context";
// import { UuidV4 } from "@libs/uuid/uuid-v4";
import { Message } from "./message";

interface EventProps {
  id?: string;
  metadata?: EventMetadata;
}

export type EventMetadata = {
  /** Timestamp when this domain event occurred */
  readonly timestamp: number;

  /** ID for correlation purposes (for Integration Events, logs correlation, etc). */
  readonly correlationId: string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  readonly causationId?: string;

  /**
   * User ID for debugging and logging purposes
   */
  readonly userId?: string;
};

export abstract class Event extends Message {
  public readonly id: string;

  public readonly metadata: EventMetadata;

  /**
   * Creates an instance of the Event class.
   * @param props - Additional metadata for the event.
   * @param id - Identifier for the event.
   */
  public constructor(props?: EventProps) {
    super();
    this.id = props?.id ?? "" /*UuidV4.generate().forceUnpack()*/;
    this.metadata = {
      correlationId:
        props?.metadata?.correlationId ??
        "" /* ApplicationContext.getCorrelationId() **/,
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
