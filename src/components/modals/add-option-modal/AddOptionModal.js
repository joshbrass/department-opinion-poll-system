import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Option answer:", answer);
        // Clear form and close modal after submission
        setAnswer("");
        handleClose();
    };
    return (_jsx("section", { className: "modal", children: _jsxs("div", { className: "modal_content", children: [_jsxs("header", { className: "modal_header", children: [_jsx("h4", { children: "Add Option" }), _jsx("button", { type: "button", className: "modal_close", onClick: handleClose, "aria-label": "Close modal", children: _jsx(IoMdClose, {}) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("h6", { children: "Option answer" }), _jsx("input", { type: "text", name: "answer", value: answer, onChange: (e) => setAnswer(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: "btn primary", children: "Add Option" })] })] }) }));
};
export default AddOptionModal;
