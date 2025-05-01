import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./OptionRating.module.css";
const OptionRating = ({ answer, voteCount, totalVotes, }) => {
    return (_jsx("li", { className: styles.result_option, children: _jsxs("div", { className: styles.result_option_info, children: [_jsxs("div", { children: [_jsx("h5", { children: answer }), _jsx("small", { children: `${voteCount} ${voteCount === 1 ? "vote" : "votes"}` })] }), _jsxs("div", { className: styles.results_option_rating, children: [_jsx("div", { className: styles.result_option_loader, children: _jsx("span", { style: {
                                    width: `${voteCount > 0 ? (voteCount / totalVotes) * 100 : 0}%`,
                                } }) }), _jsx("small", { children: `${voteCount > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : 0}%` })] })] }) }));
};
export default OptionRating;
