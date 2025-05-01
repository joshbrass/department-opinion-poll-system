import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import styles from "./Poll.module.css";
import { useDispatch } from "react-redux";
import { UiActions } from "../../store/slices/ui-slice";
const Poll = ({ id, title, description, thumbnail }) => {
    const dispatch = useDispatch();
    const openUpdateModal = () => {
        dispatch(UiActions.openUpdatePollModal());
    };
    return (_jsxs("article", { className: styles.poll, children: [_jsx("div", { className: styles.poll_image, children: _jsx("img", { src: thumbnail, alt: title }) }), _jsxs("div", { className: styles.poll_info, children: [_jsx(Link, { to: `elections/${id}`, children: _jsx("h4", { children: title }) }), _jsx("p", { children: description && description.length > 255
                            ? description.substring(0, 255) + "..."
                            : description || "No description available" }), _jsxs("div", { className: styles.poll_cta, children: [_jsxs(Link, { to: `/polls/${id}`, className: "btn sm", children: [" ", "View"] }), _jsx("button", { className: "btn sm primary", onClick: openUpdateModal, children: "Edit" })] })] })] }));
};
export default Poll;
