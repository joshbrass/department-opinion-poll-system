import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { UiActions } from '../../../store/slices/ui-slice';
const UpdatePollModal = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
        }
    };
    const handleSubmit = (e) => {
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
    return (_jsx("section", { className: 'modal', children: _jsxs("div", { className: 'modal_content', children: [_jsxs("header", { className: 'modal_header', children: [_jsx("h4", { children: "Edit Poll" }), _jsx("button", { type: "button", className: 'modal_close', onClick: handleClose, "aria-label": "Close modal", children: _jsx(IoMdClose, {}) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [error && _jsx("div", { className: "error-message", children: error }), _jsxs("div", { className: "form-group", children: [_jsx("h6", { children: "Poll Title*" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), name: 'title', required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("h6", { children: "Poll Description" }), _jsx("input", { type: "text", value: description, onChange: (e) => setDescription(e.target.value), name: 'description' })] }), _jsxs("div", { className: "form-group", children: [_jsx("h6", { children: "Poll Thumbnail" }), _jsx("input", { type: "file", accept: ".png,.jpg,.jpeg,.webp,.avif", onChange: handleFileChange, name: 'thumbnail' }), thumbnail && (_jsxs("div", { className: "file-info", children: ["Selected: ", thumbnail.name] }))] }), _jsx("button", { type: 'submit', className: 'btn primary', children: "Update poll" })] })] }) }));
};
export default UpdatePollModal;
