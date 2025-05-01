import { useState, ChangeEvent, FormEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { UiActions } from '../../../store/slices/ui-slice';

const UpdatePollModal = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        // Here you would typically:
        // 1. Validate all fields
        // 2. Submit to your API
        // 3. Handle success/error states
        console.log({
            title,
            description,
            thumbnail
        });

        // Reset form after submission
        setTitle("");
        setDescription("");
        setThumbnail(null);
        setError("");
    };

    const handleClose = () => {
        dispatch(UiActions.closeUpdatePollModal());
    };

    return (
        <section className='modal'>
            <div className='modal_content'>
                <header className='modal_header'>
                    <h4>Edit Poll</h4>
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
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            name='title' 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <h6>Poll Description</h6>
                        <input 
                            type="text" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            name='description' 
                        />
                    </div>
                    <div className="form-group">
                        <h6>Poll Thumbnail</h6>
                        <input 
                            type="file" 
                            accept=".png,.jpg,.jpeg,.webp,.avif" 
                            onChange={handleFileChange}
                            name='thumbnail' 
                        />
                        {thumbnail && (
                            <div className="file-info">
                                Selected: {thumbnail.name}
                            </div>
                        )}
                    </div>
                    <button type='submit' className='btn primary'>
                        Update poll
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdatePollModal;