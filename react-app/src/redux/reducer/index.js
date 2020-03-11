const initialState = {
  userSession: null
};

function rootReducer(state = initialState, action) {
	if (action.type === "LOGGEDIN") {
		state = { ...state, userSession: action.payload };
	}
	if (action.type === "LOGOUT") {
		state = { ...state, userSession: null };
	}
	return state;
};

export default rootReducer;