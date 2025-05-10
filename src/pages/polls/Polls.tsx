import styles from "./Polls.module.css";
import { useState, useEffect } from "react";
import Poll from "../../components/poll/Poll";
import AddPollModal from "../../components/add-poll-modal/AddPollModal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UiActions } from "../../store/slices/ui-slice";
import UpdatePollModal from "../../components/modals/update-poll-modal/UpdatePollModal";
import axios, { AxiosError } from "axios";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import ErrorMessage from "../../components/error-message/ErrorMessage";

interface PollData {
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
  options: {
    _id: string;
    answer: string;
    voteCount: number;
  }[];
  startDate: string;
  endDate: string;
  isResultVisible: boolean;
}

const Polls = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const pollModalShowing = useAppSelector((state) => state.ui.pollModalShowing);
  const updatePollModalShowing = useAppSelector((state) => state.ui.updatePollModalShowing);

  const fetchPolls = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}/polls`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch polls");
      }

      setPolls(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(axiosError.response?.data?.message || "An error occurred while fetching polls");
      } else {
        setError("An unexpected error occurred");
      }
      
      if ((err as AxiosError).response?.status === 401) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handlePollDeleted = (deletedPollId: string) => {
    // Filter out the deleted poll from the state
    setPolls(prevPolls => prevPolls.filter(poll => poll._id !== deletedPollId));
  };

  const openModal = () => {
    dispatch(UiActions.openPollModal());
  };

  if (isLoading) {
    return <LoadingSpinner  />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={fetchPolls}
      />
    );
  }

  return (
    <>
      <section className={styles.polls}>
        <div className={`container ${styles.polls_container}`}>
          <header className={styles.polls_header}>
            <h1>Total Polls</h1>
            <button className="btn primary" onClick={openModal}>
              Create new Poll
            </button>
          </header>
          
          {polls.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No polls available</p>
            </div>
          ) : (
            <menu className={styles.polls_menu}>
              {polls.map((poll) => (
                <Poll 
                  key={poll._id}
                  id={poll._id}
                  title={poll.title}
                  description={poll.description}
                  thumbnail={poll.thumbnail}
                  options={poll.options}
                  startDate={poll.startDate}
                  endDate={poll.endDate}
                  isResultVisible={poll.isResultVisible}
                  onPollDeleted={handlePollDeleted}
                />
              ))}
            </menu>
          )}
        </div>
      </section>

      {pollModalShowing && <AddPollModal onPollCreated={fetchPolls} />}
      {updatePollModalShowing && <UpdatePollModal onPollUpdated={fetchPolls} />}
    </>
  );
};

export default Polls;