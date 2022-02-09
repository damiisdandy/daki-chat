import icon from "./images/icon.jpeg";
import "./App.scss";
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./components/chat";
import Login from "./components/login";
import { FiPower } from "react-icons/fi";

firebase.initializeApp({
  apiKey: "AIzaSyCao3jE4sjFDKyiEcma6Org-PTcjiT3KWc",
  authDomain: "daki-chat.firebaseapp.com",
  projectId: "daki-chat",
  storageBucket: "daki-chat.appspot.com",
  messagingSenderId: "725983467844",
  appId: "1:725983467844:web:ad79817643bd48bc32df11",
});

const auth = getAuth();
const firestore = getFirestore();

function App() {
  const messageRef = collection(firestore, "messages");
  const q = query(messageRef, orderBy("createdAt"));
  const [messages] = useCollectionData(q);
  const [user] = useAuthState(auth);
  const userCount = 3;

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      <div className="Navbar">
        <div className="Profile">
          <div className="Image">
            <img src={icon} alt="zoro with his head bowed down" />
          </div>
          <div className="Title">
            <h1>Daki Group Chat 🚀</h1>
            {user && (
              <p className="grey-text">{userCount.toLocaleString()} users</p>
            )}
          </div>
        </div>
        {user && (
          <button className="Button" onClick={signOut}>
            <FiPower />
          </button>
        )}
      </div>
      {user ? (
        // @ts-ignore
        <Chat auth={auth} messageRef={messageRef} messages={messages} />
      ) : (
        <Login auth={auth} />
      )}
      <div className="Footer">
        Made by
        <a
          href="https://github.com/damiisdandy"
          target="_blank"
          rel="noopener noreferrer"
          className="username"
        >
          @damiisdandy
        </a>
      </div>
    </div>
  );
}

export default App;
