const initialState = {
  memes: [],
  loading: false
}

export default function memes(state = initialState, action) {
  switch(action.type) {
    case "memes/fetch/fulfilled":
      return {
        ...state,
        memes: action.payload
      }
    default:
      return state;
  }
}

export const getMemes = () => {
  return async (dispatch) => {
    try {
      const memes = await fetch('http://localhost:4000/memes');
      const json = await memes.json();
      await dispatch({type: "memes/fetch/fulfilled", payload: json})
    } catch (e) {
      dispatch({ type: "memes/fetch/rejected", error: e.toString() });
    }
  }
}