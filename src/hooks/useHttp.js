import { useReducer,useCallback } from "react";
function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      state: "pending",
      data: null,
      error: null,
    };
  } else if (action.type === "SUCCESS") {
    return {
      state: "completed",
      data: action.data,
      error: null,
    };
  } else if (action.type === "ERROR") {
    return {
      state: "completed",
      data: null,
      error: action.error,
    };
  }
  return state;
}
const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    state: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });
  const sendRequest = useCallback(async function (requestData = undefined) {
    dispatch({ type: "SEND" });
    try {
      const data = await requestFunction(requestData);
      dispatch({ type: "SUCCESS", data:data });
      console.log(data) ;
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  },[requestFunction]);
  console.log(httpState);
  return {
    sendRequest,
    ...httpState,
  };
};
export default useHttp;
