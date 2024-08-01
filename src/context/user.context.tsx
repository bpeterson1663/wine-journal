import { getAccountByIdThunk } from "features/account/accountSlice";
import { setAuth } from "features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { type Dispatch, type PropsWithChildren, createContext, useEffect, useState } from "react";
import type { AuthUserT } from "types";

type CurrentUserT = AuthUserT | null;

export const UserContext = createContext({
  setCurrentUser: (() => undefined) as Dispatch<React.SetStateAction<AuthUserT | null>>,
  currentUser: null as CurrentUserT,
  loading: true,
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<null | AuthUserT>(null);
  const [loading, setLoading] = useState(true);

  const value = { currentUser, setCurrentUser, loading };
  const { account } = useAppSelector((state) => state.account);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, uid } = user;
        if (email && uid) {
          dispatch(setAuth({ email, uid }));
          setCurrentUser({
            uid,
            email,
          });
          if (!account?.firstName) {
            await dispatch(getAccountByIdThunk(uid));
          }
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, account, dispatch]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
