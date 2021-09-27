const initialState = {
  memes: [],
  loading: false,
  currentPage: 1,
  perPage: 3,
  totalCount: 8
};

export default function memes(state = initialState, action) {
  switch (action.type) {
    case "memes/fetch/fulfilled":
      return {
        ...state,
        memes: action.payload
      };
    case "memes/getByAuthor/fulfilled":
      return {
        state,
        memes: action.payload,
      };
    case "setCurrentPage/fetch/fulfilled":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}

export const setCurrentPage = (page) => ({type: 'setCurrentPage/fetch/fulfilled', payload:page})

export const getMemes = (sort, currentPage) => {
  return async (dispatch) => {
    try {
      let url = `/memes?page=${currentPage}&limit=3`;
      if (sort) {
        url = `/memes?sort=${sort}&page=${currentPage}&limit=3`;
      }
      const memes = await fetch(url);
      const json = await memes.json();

      await dispatch({ type: "memes/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "memes/fetch/rejected", error: e.toString() });
    }
  };
};


export const getMemesByAuthor = (id) => {
  return async (dispatch) => {
    try {
      let url = `/memes/${id}`;

      const memes = await fetch(url);
      const json = await memes.json();

      await dispatch({ type: "memes/getByAuthor/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "memes/getByAuthor/rejected", error: e.toString() });
    }
  };
};
