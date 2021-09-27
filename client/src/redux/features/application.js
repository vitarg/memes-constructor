const initialState = {
  id: localStorage.getItem("id"),
  user: {},
  signinUp: false,
  signinIn: false,
  error: null,
  token: localStorage.getItem("token"),
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case "application/signup/pending":
      return {
        ...state,
        signinUp: true,
        error: null,
      };
    case "application/signup/fullfilled":
      return {
        ...state,
        signinUp: false,
      };
    case "application/signup/rejected":
      return {
        ...state,
        signinUp: false,
        error: action.error,
      };
    case "application/signin/pending":
      return {
        ...state,
        signinIn: true,
        error: null,
      };
    case "application/signin/fullfilled":
      return {
        ...state,
        signinIn: false,
        token: action.payload.json.token,
        id: action.payload.json.id,
      };
    case "application/signin/rejected":
      return {
        ...state,
        signinIn: false,
        error: action.error,
      };
    case "application/logout/fullfilled":
      return {
        ...state,
        user: {},
        token: null,
        id: null,
      };
    case "application/getUser/fullfilled":
      return {
        ...state,
        user: action.payload,
      };
    case "application/uploadAvatar/fullfilled":
      return {
        ...state,
        user: {
          ...setTimeout.user,
          avatar: action.payload,
        },
      };
    default:
      return state;
  }
}

export const createUser = (email, password, name, avatar) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });

    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ email, password, name, avatar }),
      headers: { "Content-type": "application/json" },
    });

    const json = await response.json();

    if (json.error) {
      dispatch({ type: "application/signup/rejected", error: json.error });
    } else {
      dispatch({ type: "application/signup/fullfilled", payload: json });
    }
  };
};

export const auth = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signin/pending" });

    const response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);
    if (json.error) {
      dispatch({ type: "application/signin/rejected", error: json.error });
    } else {
      dispatch({
        type: "application/signin/fullfilled",
        payload: { json },
      });
      localStorage.setItem("token", json.token);
      localStorage.setItem("id", json.id);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: "application/logout/fullfilled" });
    localStorage.clear();
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: "application/getUser/pending" });

    const response = await fetch(`/users/${id}`);

    const json = await response.json();

    if (json.error) {
      dispatch({ type: "application/getUser/rejected", error: json.error });
    } else {
      dispatch({ type: "application/getUser/fullfilled", payload: json });
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/users/avatar`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();

      dispatch({ type: "application/uploadAvatar/fullfilled", payload: json });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = (file) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/users/avatar`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();

      dispatch({ type: "application/uploadAvatar/fullfilled" });
    } catch (e) {
      console.log(e);
    }
  };
};
