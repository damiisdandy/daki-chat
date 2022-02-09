import dayjs from "dayjs";
import { FaCrown } from "react-icons/fa";

const Message = ({
  message,
  username,
  image,
  mine,
  isAdmin,
  createdAt,
}: MessageProp) => {
  const dateFormat = (date: string) => {
    const isToday =
      dayjs(date).format("MM/DD/YYYY") === dayjs().format("MM/DD/YYYY");
    const withinWeek = dayjs().diff(dayjs(date), "d") <= 6;
    if (isToday) {
      return dayjs(date).format("HH:mm");
    } else if (withinWeek) {
      return dayjs(date).format("ddd, HH:mm");
    } else {
      return dayjs(date).format("MM/DD/YYYY, HH:mm");
    }
  };
  return (
    <div className={`message ${mine && "mine"}`}>
      <div className="image">
        <img src={image} alt={`${username}`} />
      </div>
      <div className="message-box">
        <p>
          {!mine && isAdmin && <FaCrown />} {username}
        </p>
        <div className="message-content">{message}</div>
        <p className="date">{dateFormat(createdAt?.toDate())}</p>
      </div>
    </div>
  );
};

// 	MM/DD/YYYY, HH:MM (more than a week)
// ddd, HH:MM (within a week)
// HH:MM (within a day)
export default Message;
