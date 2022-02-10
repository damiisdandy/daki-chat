import { FormEventHandler, useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import Message from "./message";
import { Auth } from "firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import image from "../../images/icon.jpeg";
import dayjs from "dayjs";

const messagesFake: MessageProp[] = [
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: true,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
  {
    id: v4(),
    message: "Hey",
    username: "damilola jerugba",
    image,
    createdAt: new Date(),
    uid: v4(),
    isAdmin: false,
    mine: false,
  },
];

const Chat = ({
  auth,
  messageRef,
  messages: firebaseFetchedMessages,
}: {
  auth: Auth;
  messageRef: any;
  messages: MessageProp[];
}) => {
  const dummy = useRef(null);
  const user = auth.currentUser;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageProp[]>([]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const id = v4();
    const createdMessage = {
      id,
      message,
      username: user?.displayName,
      image: user?.photoURL,
      uid: user?.uid,
    };
    // @ts-ignore
    setMessages((state) => [
      ...state,
      { ...createdMessage, createdAt: dayjs(), loading: true },
    ]);
    setMessage("");
    // @ts-ignore
    dummy.current.scrollIntoView({
      behaviour: "smooth",
    });
    await addDoc(messageRef, {
      ...createdMessage,
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    // @ts-ignore
    dummy.current.scrollIntoView({
      behaviour: "smooth",
    });
    if (firebaseFetchedMessages && firebaseFetchedMessages.length > 0) {
      setMessages(
        firebaseFetchedMessages.map((el) => ({
          ...el,
          createdAt: el.createdAt ? el.createdAt.toDate() : dayjs(),
        }))
      );
    }
  }, [firebaseFetchedMessages]);
  return (
    <>
      <div className="Messages">
        {messages
          .map((el) => ({ ...el, mine: el.uid === user?.uid }))
          .map((el) => (
            <Message key={el.id} {...el} />
          ))}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={onSubmit} className="Input">
        <input
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message"
        />
        <button type="submit" disabled={message.length === 0}>
          <BiSend />
        </button>
      </form>
    </>
  );
};

export default Chat;
