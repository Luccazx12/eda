/** Represents an event emitter that allows emitting events and registering event listeners. */
export interface EventEmitter {
  /**
   * Emits an event with the specified name and optional arguments.
   *
   * @param eventName - The name or symbol of the event to emit.
   * @param args - Optional arguments to pass to the event listeners.
   * @returns true if the event emission is successful; otherwise, false.
   */
  emit(eventName: string | symbol, ...args: any[]): boolean;

  /**
   * Registers an event listener for the specified event.
   *
   * @param eventName - The name or symbol of the event to listen to.
   * @param listener - The function to be called when the event occurs.
   * @returns The instance of the EventEmitter to support method chaining.
   */
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
}
