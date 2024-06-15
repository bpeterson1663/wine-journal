import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Layout from "components/layout/layout.component";
import { UserContext } from "context/user.context";
import { fetchWines } from "features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "features/hooks";
import { fetchPublicTastings, fetchTastings } from "features/tasting/tastingSlice";
import SignInUp from "pages/auth/SignInUp";
import { Cellar, EditWine, NewWine, ViewWine } from "pages/cellar";
import Home from "pages/home/Home";
import NotFound from "pages/not-found/NotFound";
import { Profile } from "pages/profile";
import EditTasting from "pages/tastings/EditTasting";
import NewTasting from "pages/tastings/NewTasting";
import Tastings from "pages/tastings/Tastings";
import ViewTasting from "pages/tastings/ViewTasting";
import { type ReactNode, useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const onLoad = async () => {
      if (currentUser?.uid) {
        try {
          await Promise.all([
            dispatch(fetchTastings({ userId: currentUser.uid })),
            dispatch(fetchPublicTastings()),
            dispatch(fetchWines({ userId: currentUser.uid })),
          ]);
        } catch (err) {
          console.error(err);
          notifications.show({
            color: "red",
            message: "An error occurred loading your tastings",
          });
        }
      }
    };
    onLoad();
  }, [dispatch, currentUser]);

  const ProtectedRoute = ({ component }: { component: ReactNode }) => {
    const { currentUser, loading } = useContext(UserContext);

    if (loading) {
      return (
        <LoadingOverlay
          loaderProps={{ color: "red" }}
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      );
    }
    if (!currentUser?.uid) {
      return <Navigate to="/login" replace />;
    }

    return component;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<SignInUp />} />
        <Route index element={<ProtectedRoute component={<Home />} />} />

        <Route path="/tastings">
          <Route index element={<ProtectedRoute component={<Tastings />} />} />
          <Route path=":id" element={<ProtectedRoute component={<ViewTasting />} />} />
          <Route path="new" element={<ProtectedRoute component={<NewTasting />} />} />
          <Route path="edit" element={<ProtectedRoute component={<EditTasting />} />} />
        </Route>

        <Route path="/cellar">
          <Route index element={<ProtectedRoute component={<Cellar />} />} />
          <Route path=":id" element={<ProtectedRoute component={<ViewWine />} />} />
          <Route path="new" element={<ProtectedRoute component={<NewWine />} />} />
          <Route path="edit" element={<ProtectedRoute component={<EditWine />} />} />
        </Route>

        <Route path="/profile">
          <Route index element={<ProtectedRoute component={<Profile />} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
