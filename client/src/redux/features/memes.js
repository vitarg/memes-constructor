const initialState = {
  memes: [],
  loading: false,
  error: null,
};

export default function memes(state = initialState, action) {
  switch (action.type) {
    case "memes/fetch/fulfilled":
      return {
        ...state,
        memes: action.payload,
        loading: false,
      };
    case "memes/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "memes/getByAuthor/pending":
      return {
        ...state,
        loading: true,
      };
    case "memes/getByAuthor/fulfilled":
      return {
        state,
        memes: action.payload,
        loading: false,
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
    case "memes/rnd/fulfilled":
      return {
        ...state,
        memes: [action.payload],
      };
    case "memes/add-meme/pending":
      return {
        ...state,
        loading: true,
      };
    case "memes/add-meme/fulfilled":
      return {
        ...state,
        loading: false,
        memes: [...state.memes, action.payload],
      };
    case "memes/add-meme/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getMemes = (sort, currentPage) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "memes/fetch/pending" });
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
      dispatch({ type: "memes/getByAuthor/pending" });
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

export const rndMeme = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "memes/rnd/pending" });

      const memes = await fetch("/memes/rnd");
      const json = await memes.json();

      await dispatch({ type: "memes/rnd/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "memes/rnd/rejected", error: e.toString() });
    }
  };
};

export const addMeme = (file, template) => async (dispatch) => {
  dispatch({ type: "memes/add-meme/pending" });

  const response = await fetch(`/memes`, {
    method: "POST",
    body: JSON.stringify({ file, template }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const json = response.json();

  if (json.error) {
    dispatch({ type: "memes/add-meme/rejected", payload: json.error });
  } else {
    dispatch({ type: "memes/add-meme/fulfilled", payload: json });
  }
};
