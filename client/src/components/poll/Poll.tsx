import { Link } from "react-router-dom";
import styles from "./Poll.module.css";
import { useDispatch } from "react-redux";
import { UiActions } from "../../store/slices/ui-slice";

interface PollProps {
  id: string;
  title: string;
  description?: string; // Optional since you're using ?.length
  thumbnail: string;
}
const Poll: React.FC<PollProps> = ({ id, title, description, thumbnail }) => {

    const dispatch = useDispatch()

    const openUpdateModal = () => {
        dispatch(UiActions.openUpdatePollModal())
    }



  return (
    <article className={styles.poll}>
      <div className={styles.poll_image}>
        <img src={thumbnail} alt={title} />
      </div>
      <div className={styles.poll_info}>
        <Link to={`elections/${id}`}>
          <h4>{title}</h4>
        </Link>
        <p>
          {description?.length > 255
            ? description.substring(0, 255) + "..."
            : description}
        </p>
        <div className={styles.poll_cta}>
          <Link to={`/polls/${id}`} className="btn sm">
            {" "}
            View
          </Link>
          <button className="btn sm primary" onClick={openUpdateModal}>
            Edit
          </button>
        </div>
      </div>
    </article>
  );
};

export default Poll;
