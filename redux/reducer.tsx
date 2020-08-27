const initialPersistingState = {
  authCode: "none",
  refreshToken: "none",
};

const persistingReducer = (state = initialPersistingState, action: any) => {
  switch (action.type) {
    case "SET_AUTH_CODE": {
      return { ...state, authCode: action.authCode };
    }
    case "SET_REFRESH_TOKEN": {
      return { ...state, refreshToken: action.refreshToken };
    }
    case "LOGOUT": {
      return { ...state, authCode: "none", refreshToken: "none" };
    }
    default: {
      return state;
    }
  }
};

export default persistingReducer;
