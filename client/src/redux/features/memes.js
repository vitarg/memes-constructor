const initialState = {
  memes: [],
  loading: false,
};

export default function memes(state = initialState, action) {
  switch (action.type) {
    case "memes/fetch/fulfilled":
      return {
        ...state,
        memes: action.payload,
      };
    default:
      return state;
  }
}

export const getMemes = (sort) => {
  return async (dispatch) => {
    try {
      let url = "/memes";
      if (sort) {
        url = `/memes?sort=${sort}`;
      }

      const memes = await fetch(url);
      const json = await memes.json();

      await dispatch({ type: "memes/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "memes/fetch/rejected", error: e.toString() });
    }
  };
};
