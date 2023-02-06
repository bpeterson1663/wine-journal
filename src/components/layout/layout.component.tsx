import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { fetchTastingListStart } from '../../features/tasting/tastingSlice'
import { fetchVarietalListStart } from '../../features/varietal/varietalSlice'
import { fetchWineListStart } from '../../features/wine/wineSlice'
import NavBar from '../nav-bar/nav-bar.component'

const Layout = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.auth)
  useEffect(() => {
    dispatch(fetchTastingListStart(currentUser?.uid ?? ''))
    dispatch(fetchWineListStart(currentUser?.uid ?? ''))
    dispatch(fetchVarietalListStart())
  }, [dispatch, currentUser?.uid])
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Layout
