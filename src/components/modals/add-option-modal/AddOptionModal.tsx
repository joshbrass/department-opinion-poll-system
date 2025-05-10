import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { UiActions } from "../../../store/slices/ui-slice";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddOptionModalProps {
  pollId: string;
  onOptionAdded: () => Promise<void>;
}

const AddOptionModal = ({ pollId, onOptionAdded }: AddOptionModalProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(UiActions.closeAddOptionModal());
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!answer.trim()) {
      setError("Option answer cannot be empty");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    try {
      console.log("Sending payload:", { answer,  pollId });
      console.log("Endpoint:", `${import.meta.env.VITE_REACT_APP_URL}/options`);
      
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/options`,
        { answer,  pollId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Response:", response.data);
  
      if (response.data.success) {
        toast.success("Option added successfully!");
        setAnswer("");
        await onOptionAdded();
        handleClose();
      } else {
        throw new Error(response.data.message || "Failed to add option");
      }
    } catch (error) {
      let errorMessage = "Failed to add option";
      
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        errorMessage = error.response?.data?.message || error.message;
        
        // Check for specific status codes
        if (error.response?.status === 403) {
          errorMessage = "Only admins can add options";
        } else if (error.response?.status === 400) {
          errorMessage = "Cannot add options to expired polls";
        }
      } else {
        console.error("Unexpected error:", error);
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="modal">
      <div className="modal_content">
        <header className="modal_header">
          <h4>Add Option</h4>
          <button
            type="button"
            className="modal_close"
            onClick={handleClose}
            aria-label="Close modal"
            disabled={isSubmitting}
          >
            <IoMdClose />
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="answer">Option Text*</label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className="btn primary" 
            disabled={isSubmitting || !answer.trim()}
          >
            {isSubmitting ? "Adding..." : "Add Option"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddOptionModal;