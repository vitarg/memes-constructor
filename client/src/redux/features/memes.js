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
    case "memes/likeMeme/fulfilled": {
      return {
        ...state,
        memes: state.memes.map((item) => {
          if (action.payload.memeId === item._id) {
            return {
              ...item,
              likes: [...item.likes, localStorage.getItem("id")],
            };
          }
          return item;
        }),
      };
    }
    case "memes/unlikeMeme/fulfilled":
      return {
        ...state,
        memes: state.memes.map((item) => {
          if (action.payload.memeId === item._id) {
            return {
              ...item,
              likes: item.likes.filter((e) => e !== localStorage.getItem("id")),
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export const setCurrentPage = (page) => ({
  type: "setCurrentPage/fetch/fulfilled",
  payload: page,
});

export const getMemes = (sort, currentPage) => {
  return async (dispatch) => {
    try {
      let url = `/memes`;
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
export const likeMeme = (idMeme) => async (dispatch) => {
  try {
    console.log(idMeme);
    const res = await fetch(`/memes/likes/${idMeme}`, {
      method: "POST",
      body: JSON.stringify({ idMeme }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (json.status) {
      dispatch({ type: "memes/likeMeme/fulfilled", payload: json });
    } else {
      dispatch({ type: "memes/unlikeMeme/fulfilled", payload: json });
    }
  } catch (e) {
    dispatch({ type: "memes/likeMeme/rejected", error: e.toString() });
  }
};
