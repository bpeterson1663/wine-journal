import { createContext, useState, PropsWithChildren, Dispatch, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { setAuth } from 'features/auth/authSlice'
import { useAppSelector, useAppDispatch } from 'features/hooks'
import { getUserProfileById } from 'features/user/userSlice'
import { AuthUserT } from 'types'

type CurrentUserT = AuthUserT | null

export const UserContext = createContext({
  setCurrentUser: (() => undefined) as Dispatch<any>,
  currentUser: null as CurrentUserT,
  loading: true,
})

export const UserProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState<null | AuthUserT>(null)
  const [loading, setLoading] = useState(false)

  const value = { currentUser, setCurrentUser, loading }
  const { userProfile } = useAppSelector((state) => state.user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, uid } = user
        if (email && uid) {
          dispatch(setAuth({ email, uid }))
          setCurrentUser({
            uid,
            email,
          })
          if (!userProfile?.firstName) {
            await dispatch(getUserProfileById(uid))
          }
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [auth, userProfile, dispatch])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
