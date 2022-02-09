import { FormEventHandler, useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import Message from "./message";
import { Auth } from "firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";

const Chat = ({
  auth,
  messageRef,
  messages,
}: {
  auth: Auth;
  messageRef: any;
  messages: MessageProp[];
}) => {
  const user = auth.currentUser;
  const [message, setMessage] = useState("");
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    addDoc(messageRef, {
      id: v4(),
      message,
      username: user?.displayName,
      image: user?.photoURL,
      createdAt: serverTimestamp(),
      uid: user?.uid,
    });
    setMessage("");
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <div className="Messages">
        {messages &&
          messages
            .map((el) => ({ ...el, mine: el.uid === user?.uid }))
            .map((el) => <Message key={el.id} {...el} />)}
        <div style={{ marginBottom: "10rem" }}></div>
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
