import { Message } from '../../../@types';

function MessagesItem({ author, content }: Message) {
  return (
    <article className="messages-item">
      <p className="messages-item__author">{author}</p>
      <p className="messages-item__content">{content}</p>
    </article>
  );
}

export default MessagesItem;
