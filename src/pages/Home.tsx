import { authSuccess } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchUserStart } from 'features/user/userSlice'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import SignInUp from 'pages/SignInUp'
import Tastings from 'pages/Tastings'
import { useState } from 'react'

export default function Home() {
  const auth = getAuth()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const { userProfile } = useAppSelector((state) => state.user)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, uid } = user
      if (email && uid) {
        dispatch(authSuccess({ email, uid }))
        setUser(user)
        setLoading(false)
        if (!userProfile?.firstName) {
          dispatch(fetchUserStart(uid))
        }
      }
    } else {
      setLoading(false)
      setUser(null)
    }
  })

  if (loading) {
    return <div>Loading....</div>
  }

  if (user) {
    return <Tastings />
  }
  return <SignInUp />
}
