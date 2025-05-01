import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoMdTrash } from 'react-icons/io';
import styles from './PollOption.module.css';
const PollOption = ({ answer, voteCount, onDelete }) => {
    return (_jsx("li", { className: styles.poll_option, children: _jsxs("div", { children: [_jsx("h5", { children: answer }), _jsxs("small", { children: [voteCount, " vote", voteCount !== 1 ? 's' : ''] }), onDelete && (_jsx("button", { className: styles.poll_option__btn, onClick: onDelete, "aria-label": `Delete option "${answer}"`, children: _jsx(IoMdTrash, {}) }))] }) }));
};
export default PollOption;
