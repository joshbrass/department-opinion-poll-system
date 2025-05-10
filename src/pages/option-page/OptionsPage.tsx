import { useState, useEffect } from "react";
import styles from "./OptionsPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Option from "../../components/option/Option";
import ConfirmVoteModal from "../../components/modals/confirm-vote-modal/ConfirmVoteModal";
import { userActions } from "../../store/slices/user-slice";
import { UiActions } from "../../store/slices/ui-slice";
import axios from "axios";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";

import ErrorMessage from "../../components/error-message/ErrorMessage";

interface OptionType {
  _id: string;
  answer: string;
  poll: string;
  voteCount: number;
  votedBy: string[];
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: OptionType[];
  message?: string;
}

const OptionsPage = () => {
  const { id: pollId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Get state from Redux store

  const { voteOpinionModalShowing } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<ApiResponse>(
          `${import.meta.env.VITE_REACT_APP_URL}/polls/${pollId}/options`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to fetch options");
        }

        setOptions(response.data.data);
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to fetch options";

        setError(errorMessage);

        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("authToken");
          // Redirect to login or handle unauthorized
        }
      } finally {
        setLoading(false);
      }
    };

    if (pollId) {
      fetchOptions();
    }
  }, [pollId]);

  const handleVoteClick = (option: OptionType) => {
    setSelectedOption(option);
    dispatch(userActions.changeSelectedUserOption(option._id));
    dispatch(UiActions.openVoteOpinionModal());
  };

  const handleCancel = () => {
    dispatch(UiActions.closeVoteOpinionModal());
    dispatch(userActions.changeSelectedUserOption(""));
    setSelectedOption(null);
  };

  const handleConfirm = async () => {
    if (!selectedOption) return;

    try {
      setIsSubmitting(true);

      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_URL}/options/${selectedOption._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data.success) {
        // Update local state with new vote count
        setOptions(
          options.map((opt) =>
            opt._id === selectedOption._id
              ? {
                  ...opt,
                  voteCount: opt.voteCount + 1,
                  votedBy: [...opt.votedBy, "current-user-id"],
                }
              : opt
          )
        );

        // Redirect to congrats page after successful vote
        navigate("/congrats");
      } else {
        throw new Error(response.data.message || "Vote failed");
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Failed to submit vote";

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
      dispatch(UiActions.closeVoteOpinionModal());
      dispatch(userActions.changeSelectedUserOption(""));
      setSelectedOption(null);
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <section className={styles.options}>
        <header className={styles.options_header}>
          <h1>What's your opinion?</h1>
          <p>
            These are the options for the selected poll. Please vote once,
            because you won't be allowed to vote on this poll again.
          </p>
        </header>
        <div className={styles.opinion_container}>
          {options.map((option) => (
            <Option
              key={option._id}
              id={option._id}
              answer={option.answer}
              voteCount={option.voteCount}
              onVoteClick={() => handleVoteClick(option)}
            />
          ))}
        </div>
      </section>

      {voteOpinionModalShowing && selectedOption && (
        <ConfirmVoteModal
          opinionId={selectedOption._id}
          opinionAnswer={selectedOption.answer}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default OptionsPage;
