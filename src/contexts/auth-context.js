import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { AuthService } from 'src/services/auth-service';
import { useRouter } from 'next/router';
import { JobService } from 'src/services';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  CONFIRM: 'CONFIRM',
  FETCH_JOB: 'FETCH_JOB'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  confirmMessage: null,
  isJobFetched: false,
  job: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  },
  [HANDLERS.CONFIRM]: (state, action) => {
    const confirmMessage = action.payload;

    return {
      ...state,
      confirmMessage
    };
  },
  [HANDLERS.FETCH_JOB]: (state, action) => {
    const job = action.payload;

    return {
      ...state,
      isJobFetched: true,
      job
    };
  },
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

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
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated && !pathname.includes('auth')) {
      const { data } = await AuthService.me();

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: data.result
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };


  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const setUser = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    const { data } = await AuthService.login(email, password);
    const { result: { access_token, user } } = data;

    localStorage.setItem("auth_token", access_token);

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async ({...values}) => {
    const { data } = await AuthService.register(values);

    console.log('data', data)
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  const showConfirmDlg = (confirmMessage) => {
    dispatch({
      type: HANDLERS.CONFIRM,
      payload: confirmMessage
    });
  }

  const hideConfirm = async () => {
    dispatch({
      type: HANDLERS.CONFIRM,
      payload: { open: false },
    });
  };

  const fetchJob = async () => {
    let isJobFetched = false;

    try {
      isJobFetched = window.sessionStorage.getItem('jobFetched') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (state.isAuthenticated && (!isJobFetched || !state.job)) {
      const { data } = await JobService.mine();
      const { result } = data;
      try {
        window.sessionStorage.setItem('jobFetched', 'true');
      } catch (err) {
        console.error(err);
      }
  
      dispatch({
        type: HANDLERS.FETCH_JOB,
        payload: result
      });
    } else {
      dispatch({
        type: HANDLERS.FETCH_JOB,
      });
    }
  };

  useEffect(
    () => {
      initialize();
      fetchJob();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        setUser,
        showConfirmDlg,
        hideConfirm,
        fetchJob
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
