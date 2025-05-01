import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    addOptionModalShowing: false,
    voteOpinionModalShowing: false,
    opinionModalShowing: false,
    pollModalShowing: false,
    updatePollModalShowing: false,
};
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openPollModal(state) {
            state.pollModalShowing = true;
        },
        closePollModal(state) {
            state.pollModalShowing = false;
        },
        openAddOptionModal(state) {
            state.addOptionModalShowing = true;
        },
        closeAddOptionModal(state) {
            state.addOptionModalShowing = false;
        },
        openVoteOpinionModal(state) {
            state.voteOpinionModalShowing = true;
        },
        closeVoteOpinionModal(state) {
            state.voteOpinionModalShowing = false;
        },
        openOpinionModal(state) {
            state.opinionModalShowing = true;
        },
        closeOpinionModal(state) {
            state.opinionModalShowing = false;
        },
        openUpdatePollModal(state) {
            state.updatePollModalShowing = true;
        },
        closeUpdatePollModal(state) {
            state.updatePollModalShowing = false;
        },
    },
});
export const UiActions = uiSlice.actions;
export default uiSlice;
