import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { AuthService } from "src/services/auth-service";
import { useRouter } from "next/router";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  CONFIRM: "CONFIRM",
  FETCH_JOB: "FETCH_JOB",
  REFRESH: "REFRESH",
  JOB_FORM: "JOB_FORM",
  SET_PROJECT: "SET_PROJECT",
  SET_PROJECTS: "SET_PROJECTS",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  isAdmin: false,
  confirmMessage: null,
  isJobFetched: false,
  job: null,
  shouldRefresh: false,
  openJobForm: false,
  projects: [],
  project: null,
};

const checkAdmin = (user) => user?.roles?.find(({ role_name }) => role_name === "admin");
const pickProject = (projects) => (projects && projects.length > 0 ? projects[0] : null);

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const { user, projects } = action.payload;
    const isAdmin = checkAdmin(user);
    const project = pickProject(projects);
    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            isAdmin,
            user,
          }
        : {
            isLoading: false,
          }),
      projects,
      project,
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { user, projects } = action.payload;

    const isAdmin = checkAdmin(user);
    const project = pickProject(projects);

    return {
      ...state,
      isAuthenticated: true,
      user,
      projects,
      project,
      isAdmin,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  [HANDLERS.CONFIRM]: (state, action) => {
    const confirmMessage = action.payload;

    return {
      ...state,
      confirmMessage,
    };
  },
  [HANDLERS.FETCH_JOB]: (state, action) => {
    const job = action.payload;

    return {
      ...state,
      isJobFetched: true,
      job,
    };
  },
  [HANDLERS.REFRESH]: (state, action) => {
    return {
      ...state,
      shouldRefresh: !state.shouldRefresh,
    };
  },
  [HANDLERS.JOB_FORM]: (state, action) => {
    const { open } = action.payload;
    return {
      ...state,
      openJobForm: open,
    };
  },
  [HANDLERS.SET_PROJECT]: (state, action) => {
    return {
      ...state,
      project: action.payload,
    };
  },
  [HANDLERS.SET_PROJECTS]: (state, action) => {
    return {
      ...state,
      projects: action.payload,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const { pathname } = useRouter();

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated && !pathname.includes("auth")) {
      const { data } = await AuthService.me();

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: data.result,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: {},
      });
    }
  };

  const setUser = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: { user },
    });
  };

  const dispatchLogin = (data) => {
    const {
      result: { access_token, user, projects },
    } = data;

    localStorage.setItem("auth_token", access_token);

    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: { user, projects },
    });
  };

  const signIn = async (email, password) => {
    const { data } = await AuthService.login(email, password);
    dispatchLogin(data);
  };

  const signUp = async ({ ...values }) => {
    const { data } = await AuthService.register(values);
    dispatchLogin(data);
  };

  const signOut = () => {
    localStorage.removeItem("auth_token");
    window.sessionStorage.setItem("authenticated", "false");

    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const showConfirmDlg = (confirmMessage) => {
    dispatch({
      type: HANDLERS.CONFIRM,
      payload: confirmMessage,
    });
  };

  const hideConfirm = async () => {
    dispatch({
      type: HANDLERS.CONFIRM,
      payload: { open: false },
    });
  };

  const refresh = async () => {
    dispatch({
      type: HANDLERS.REFRESH,
    });
  };

  const showJobForm = (open) => {
    dispatch({
      type: HANDLERS.JOB_FORM,
      payload: { open },
    });
  };

  const setProject = (payload) => {
    dispatch({
      type: HANDLERS.SET_PROJECT,
      payload,
    });
  };

  const setProjects = (payload) => {
    dispatch({
      type: HANDLERS.SET_PROJECTS,
      payload,
    });
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        setUser,
        showConfirmDlg,
        hideConfirm,
        refresh,
        showJobForm,
        setProject,
        setProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
