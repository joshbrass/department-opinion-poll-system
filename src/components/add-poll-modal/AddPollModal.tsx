import { useState, ChangeEvent, FormEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { UiActions } from '../../store/slices/ui-slice';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PollFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnail: File | null;
}

const AddPollModal = ({ onPollCreated }: { onPollCreated?: () => void }) => {
    const [formData, setFormData] = useState<PollFormData>({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        thumbnail: null
    });
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, thumbnail: e.target.files![0] }));
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!formData.title.trim()) {
            setError("Title is required");
            return;
        }
        if (!formData.startDate) {
            setError("Start date is required");
            return;
        }
        if (!formData.endDate) {
            setError("End date is required");
            return;
        }
        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            setError("End date must be after start date");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('startDate', formData.startDate);
            formDataToSend.append('endDate', formData.endDate);
            if (formData.thumbnail) {
                formDataToSend.append('thumbnail', formData.thumbnail);
            }

            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_URL}/polls`,
                formDataToSend,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                toast.success('Poll created successfully');
                dispatch(UiActions.closePollModal());
                if (onPollCreated) {
                    onPollCreated();
                }
            } else {
                throw new Error(response.data.message || 'Failed to create poll');
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create poll';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        dispatch(UiActions.closePollModal());
    };

    return (
        <section className='modal'>
            <div className='modal_content'>
                <header className='modal_header'>
                    <h4>Create New Poll</h4>
                    <button 
                        type="button" 
                        className='modal_close' 
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <IoMdClose/>
                    </button>
                </header>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <h6>Poll Title*</h6>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title} 
                            onChange={handleInputChange} 
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <h6>Poll Description</h6>
                        <textarea 
                            name="description"
                            value={formData.description} 
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </div>
                    
                    <div className="form-group">
                        <h6>Start Date*</h6>
                        <input 
                            type="datetime-local" 
                            name="startDate"
                            value={formData.startDate} 
                            onChange={handleInputChange} 
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <h6>End Date*</h6>
                        <input 
                            type="datetime-local" 
                            name="endDate"
                            value={formData.endDate} 
                            onChange={handleInputChange} 
                            required
                            min={formData.startDate}
                        />
                    </div>
                    
                    <div className="form-group">
                        <h6>Poll Thumbnail</h6>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange}
                            name="thumbnail" 
                        />
                        {formData.thumbnail && (
                            <div className="file-info">
                                Selected: {formData.thumbnail.name}
                            </div>
                        )}
                    </div>
                    
                    <button 
                        type='submit' 
                        className='btn primary'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Poll'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddPollModal;