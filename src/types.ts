import { Message } from './message';
import { Handler } from './handler';

interface GetNameInterface {
  getName: () => string;
}

export type Newable<T> = new (...args: any[]) => T;
export type MessageHandler = Handler<Message>;
export type NewableMessage = Newable<Message> & GetNameInterface;
export type NewableMessageHandler = Newable<MessageHandler>;
