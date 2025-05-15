import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PollsList.module.css";
import axios, { AxiosError } from "axios";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ErrorMessage from "../../components/error-message/ErrorMessage";

interface ThumbnailData {
  type: string;
  data: number[];
}

interface Thumbnail {
  data: ThumbnailData;
  contentType: string;
}

interface Option {
  _id: string;
  answer: string;
  voteCount: number;
}

interface Poll {
  _id: string;
  title: string;
  description: string;
  thumbnail?: Thumbnail;
  startDate: string;
  endDate: string;
  options: Option[];
  isResultVisible: boolean;
}

const PollsList = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const authToken = localStorage.getItem("authToken");

  const fetchActivePolls = async () => {
    if (!apiUrl) {
      setError("Configuration error - please contact support");
      setIsLoading(false);
      return;
    }

    if (!authToken) {
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${apiUrl}/polls/active`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to fetch active polls"
        );
      }

      if (!Array.isArray(response.data?.data)) {
        throw new Error("Invalid data format received from server");
      }

      setPolls(response.data.data);
    } catch (err) {
      handleFetchError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const userRole = currentUser?.isAdmin ? "Admin" : "Student";

  const handleFetchError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "An error occurred while fetching polls"
      );
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred");
    }
  };

  // Generate image URLs and manage cleanup
  const pollDataWithImages = useMemo(() => {
    return polls.map((poll) => {
      let imageUrl: string | null = null;

      try {
        if (poll.thumbnail?.data?.data?.length && poll.thumbnail?.contentType) {
          const byteArray = new Uint8Array(poll.thumbnail.data.data);
          const blob = new Blob([byteArray], {
            type: poll.thumbnail.contentType,
          });
          imageUrl = URL.createObjectURL(blob);
        }
      } catch (error) {
        console.error("Image conversion error:", error);
      }

      return {
        ...poll,
        imageUrl,
      };
    });
  }, [polls]);

  useEffect(() => {
    const urls = pollDataWithImages
      .map((poll) => poll.imageUrl)
      .filter(Boolean) as string[];

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pollDataWithImages]);

  useEffect(() => {
    fetchActivePolls();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchActivePolls} />;
  }

  if (polls.length === 0) {
    return (
      <div className={styles.noPolls}>
        <h3>No active polls available</h3>
        <p>There are currently no polls available for voting.</p>
      </div>
    );
  }

  return (
    <section className={styles.polls_container}>
      <div className={`container ${styles.polls_wrapper}`}>
        <div className={styles.header}>
          <h2>Available Polls ({polls.length})</h2>
          <p className={styles.role}>{userRole}</p>
        </div>

        <div className={styles.polls_grid}>
          {pollDataWithImages.map((poll) => (
            <div key={poll._id} className={styles.poll_card}>
              <h3>{poll.title}</h3>
              <p className={styles.poll_description}>{poll.description}</p>
              {poll.imageUrl && (
                <img
                  src={poll.imageUrl}
                  alt={poll.title}
                  className={styles.thumbnail}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div className={styles.poll_stats}>
                <span>{poll.options.length} options</span>
                <span>Ends: {formatDate(poll.endDate)}</span>
              </div>
              <button
                onClick={() => navigate(`/polls/${poll._id}/option`)}
                className={styles.vote_button}
              >
                Vote Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PollsList;
