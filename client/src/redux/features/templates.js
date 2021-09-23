const initialState = {
  loading: false,
  items: [],
  error: null,
};

export default function templates(state = initialState, action) {
  switch (action.type) {
    case "templates/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "templates/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "templates/fetch/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getTemplates = () => async (dispatch) => {
  dispatch({ type: "templates/fetch/pending" });

  const response = await fetch("http://localhost:4000/templates");
  const json = await response.json();

  if (json.error) {
    dispatch({ type: "templates/fetch/rejected", payload: json.error });
  } else {
    dispatch({ type: "templates/fetch/fulfilled", payload: json });
  }
};
