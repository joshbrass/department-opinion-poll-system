import { Link, useNavigate } from "react-router-dom";
import styles from "./Poll.module.css";
import { useDispatch } from "react-redux";
import { UiActions } from "../../store/slices/ui-slice";
import { useState } from "react";
import defaultImage from '../../assets/images/flag1.jpg';
import axios, { AxiosError } from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PollProps {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    data: {
      type: string;
      data: number[];
    };
    contentType: string;
  };
  options: {
    _id: string;
    answer: string;
    voteCount: number;
  }[];
  startDate: string;
  endDate: string;
  isResultVisible?: boolean;
  onPollDeleted?: (pollId: string) => void;
}

const Poll: React.FC<PollProps> = ({
  id,
  title,
  description,
  thumbnail,
  options,
  startDate,
  endDate,
  isResultVisible,
  onPollDeleted
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openUpdateModal = () => {
    dispatch(UiActions.setSelectedPollId(id));
    dispatch(UiActions.openUpdatePollModal());
  };

  const getImageUrl = () => {
    try {
      if (!thumbnail?.data?.data?.length) return null;
      
      const byteArray = new Uint8Array(thumbnail.data.data);
      const blob = new Blob([byteArray], { type: thumbnail.contentType });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Image conversion error:", error);
      return null;
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this poll?')) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL}/polls/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Poll deleted successfully');
        if (onPollDeleted) {
          onPollDeleted(id); 
        }
      } else {
        throw new Error(response.data.message || 'Failed to delete poll');
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete poll';
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate('/login');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const imageUrl = getImageUrl();

  return (
    <article className={styles.poll}>
      <div className={styles.poll_image}>
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={title}
            onError={() => setImageError(true)}
          />
        ) : (
          <img 
            src={defaultImage} 
            alt="Default poll thumbnail"
            className={styles.default_image}
          />
        )}
      </div>
      <div className={styles.poll_info}>
        <Link to={`/polls/${id}`}>
          <h4>{title}</h4>
        </Link>
        <p>
          {description && description.length > 255
            ? `${description.substring(0, 255)}...`
            : description || "No description available"}
        </p>
        <div className={styles.poll_stats}>
          <span>{options.length} options </span>
          <span>
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </span>
          {isResultVisible && <span className={styles.resultBadge}>Results Visible</span>}
        </div>
        <div className={styles.poll_cta}>
          <Link to={`/polls/${id}`} className="btn sm">
            View
          </Link>
          <button 
            className="btn sm primary" 
            onClick={openUpdateModal}
            aria-label="Edit poll"
            disabled={isDeleting}
          >
            Edit
          </button>
          <button 
            className="btn sm danger" 
            onClick={handleDelete}
            aria-label="Delete poll"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Poll;