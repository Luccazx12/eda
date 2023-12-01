import { Option } from 'oxide.ts';

/**
 * Interface for an Event Store, responsible for persisting and retrieving events.
 */
export interface EventStore {
  /**
   * Inserts an event into the event store.
   * @param event The event to be inserted.
   */
  insert<E extends Event>(event: E): Promise<void>;

  /**
   * Finds an event by its ID.
   * @param eventId The ID of the event to find.
   * @returns An Option containing the event, if found.
   */
  findById<E extends Event>(eventId: string): Promise<Option<E>>;

  /**
   * Lists events by the aggregate id.
   * @param aggregateId The id of the aggregate to filter events.
   * @returns An array of events associated with the specified aggregate.
   */
  listByAggregateId<E extends Event>(aggregateId: string): Promise<E[]>;
}
