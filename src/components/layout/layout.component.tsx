import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchTastingListStart } from 'features/tasting/tastingSlice'
import NavBar from 'components/nav-bar/nav-bar.component'
import { fetchWines } from 'features/cellar/cellarSlice'

const Layout = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(state => state.auth)

  useEffect(() => {
    Promise.all([
      dispatch(fetchWines(currentUser?.uid ?? ''))
    ]).catch(err => { console.error(err) })

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
