import { useCallback, useReducer } from "react";

const loadReducer = (htttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, extra: action.reqExtra };
    case "RESPONSE":
      return { ...htttpState, loading: false, data: action.data };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return { loading: false, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [htttpState, dispatch] = useReducer(loadReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback((url, method, body, reqExtra) => {
    dispatch({ type: "SEND", extra: reqExtra });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatch({ type: "RESPONSE", responseData: responseData });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", errorData: "Something went wrong" });
      }, []);
  });
  return {
    isLoading: htttpState.loading,
    error: htttpState.error,
    data: htttpState.data,
    sendRequest: sendRequest,
    reqExtra: htttpState.reqExtra,
  };
};

export default useHttp;
