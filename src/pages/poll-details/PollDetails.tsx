import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UiActions } from "../../store/slices/ui-slice";
import PollOption from "../../components/poll-option/PollOption";
import AddOptionModal from "../../components/modals/add-option-modal/AddOptionModal";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import axios, { AxiosError } from "axios";

import "react-toastify/dist/ReactToastify.css";
import styles from "./PollDetails.module.css";

interface User {
  _id: string;
  name?: string;
  email: string;
  role?: string;
}

interface Option {
  _id: string;
  answer: string;
  voteCount: number;
  votedBy: User[];
}

interface PollDetails {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    data: {
      type: string;
      data: number[];
    };
    contentType: string;
  };
  createdBy: User;
  startDate: string;
  endDate: string;
  isResultVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

const PollDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<PollDetails | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addOptionModalShowing = useAppSelector(
    (state) => state.ui.addOptionModalShowing
  );

  const fetchPollDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [pollResponse, optionsResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_REACT_APP_URL}/polls/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }),
        axios.get(`${import.meta.env.VITE_REACT_APP_URL}/polls/${id}/options`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }),
      ]);

      if (!pollResponse.data.success || !optionsResponse.data.success) {
        throw new Error("Failed to fetch poll data");
      }

      setPoll(pollResponse.data.data);
      setOptions(optionsResponse.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(
          axiosError.response?.data?.message ||
            "An error occurred while fetching poll details"
        );

        if (axiosError.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOption = async (optionId: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL}/options/${optionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data.success) {
        setOptions((prevOptions) =>
          prevOptions.filter((option) => option._id !== optionId)
        );
      } else {
        throw new Error(response.data.message || "Failed to delete option");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Failed to delete option:",
          err.response?.data.message || err.message
        );
        alert(
          err.response?.data.message || "An error occurred while deleting the option"
        );
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred while deleting the option.");
      }
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, [id]);

  const openModal = () => {
    dispatch(UiActions.openAddOptionModal());
  };

  const getImageUrl = () => {
    if (!poll?.thumbnail?.data?.data?.length) return null;

    try {
      const byteArray = new Uint8Array(poll.thumbnail.data.data);
      const blob = new Blob([byteArray], { type: poll.thumbnail.contentType });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Image conversion error:", error);
      return null;
    }
  };

  const imageUrl = getImageUrl();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPollDetails} />;
  }

  if (!poll) {
    return <div className={styles.notFound}>Poll not found</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <section className={styles.pollDetails}>
        <div className={`container ${styles.pollDetails_container}`}>
          <h1>{poll.title}</h1>

          {poll.description && (
            <p className={styles.description}>{poll.description}</p>
          )}

          <div className={styles.metaInfo}>
            <span>Created by: {poll.createdBy.name || poll.createdBy.email}</span>
            <span>Start: {formatDate(poll.startDate)}</span>
            <span>End: {formatDate(poll.endDate)}</span>
            <span>
              {poll.isResultVisible ? "Results visible" : "Results hidden"}
            </span>
          </div>

          {imageUrl && (
            <div className={styles.pollDetails_image}>
              <img src={imageUrl} alt={poll.title} />
            </div>
          )}

          <menu className={styles.poll_details_option}>
            <h2>Options ({options.length})</h2>
            {options.length > 0 ? (
              options.map((option) => (
                <div key={option._id} className={styles.optionContainer}>
                  <PollOption
                    answer={option.answer}
                    voteCount={option.voteCount}
                    voters={option.votedBy}
                  />
                  <button
                    className={styles.deleteOptionBtn}
                    onClick={() => deleteOption(option._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.noOptions}>No options available yet</p>
            )}

            <button onClick={openModal} className={styles.add_option_btn}>
              <IoAddOutline /> Add Option
            </button>
          </menu>
        </div>
      </section>

      {addOptionModalShowing && (
        <AddOptionModal pollId={poll._id} onOptionAdded={fetchPollDetails} />
      )}
    </>
  );
};

export default PollDetails;