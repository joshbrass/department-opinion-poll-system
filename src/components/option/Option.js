import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Option.module.css';
const Option = ({ answer, onVoteClick }) => {
    return (_jsxs("article", { className: styles.option, children: [_jsx("div", {}), _jsx("h5", { children: answer }), _jsx("button", { className: "btn primary", onClick: onVoteClick, children: "Vote" })] }));
};
export default Option;
