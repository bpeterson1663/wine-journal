import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchTastingListStart } from '../../features/tasting/tastingSlice'
import NavBar from '../nav-bar/nav-bar.component'

const Layout = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.auth)
  useEffect(() => {
    dispatch(fetchTastingListStart(currentUser?.uid ?? ''))
  }, [dispatch, currentUser?.uid])
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Layout
