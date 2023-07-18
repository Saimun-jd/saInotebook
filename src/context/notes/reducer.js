import ACTIONS from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: action.payload.alertType,
                alertText: action.payload.alertText,
            };
        case ACTIONS.HIDE_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: "",
                alertText: "",
            };
        default:
            throw new Error(`no such action : ${action.type}`);
    }
};
export default reducer;
