import { useState, useEffect } from 'react';
import styles from './Results.module.css'; 
import PollsResult from '../../components/pollls-result/PollsResult';
import axios, { AxiosError } from 'axios';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import ErrorMessage from '../../components/error-message/ErrorMessage';

interface Option {
  _id: string;
  answer: string;
  voteCount: number;
}

interface Poll {
  _id: string;
  title: string;
  description: string;
  thumbnail?: {
    data: {
      type: string;
      data: number[];
    };
    contentType: string;
  };
  startDate: string;
  endDate: string;
  createdBy: string;
  options: Option[];
  isResultVisible: boolean;
}

const Results = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivePolls = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}/polls/active`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch active polls");
      }

      // Only show polls where results are visible
      const visiblePolls = response.data.data.filter((poll: Poll) => poll.isResultVisible);
      setPolls(visiblePolls);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(axiosError.response?.data?.message || "An error occurred while fetching results");
        
        if (axiosError.response?.status === 401) {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivePolls();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchActivePolls} />;
  }

  if (polls.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No results available yet</h3>
        <p>There are currently no polls with visible results.</p>
      </div>
    );
  }

  return (
    <section className={styles.results_container}>
      <div className={`container ${styles.results_wrapper}`}>
        {polls.map(poll => (
          <PollsResult 
            key={poll._id} 
            id={poll._id}
            title={poll.title}
            description={poll.description}
            thumbnail={poll.thumbnail}
            options={poll.options}
            startDate={poll.startDate}
            endDate={poll.endDate}
          />
        ))}
      </div>
    </section>
  );
};

export default Results;