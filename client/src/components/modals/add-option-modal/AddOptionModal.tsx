import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { UiActions } from "../../../store/slices/ui-slice";

const AddOptionModal = () => {
    const [answer, setAnswer] = useState("");
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(UiActions.closeAddOptionModal());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Option answer:", answer);
        
        // Clear form and close modal after submission
        setAnswer("");
        handleClose();
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
                    >
                        <IoMdClose/>
                    </button>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h6>Option answer</h6>
                        <input 
                            type="text" 
                            name="answer" 
                            value={answer} 
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn primary">
                        Add Option
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddOptionModal;