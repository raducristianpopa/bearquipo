import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { selectCurentUserStore, setUser } from "./features/auth/userSlice";
import { useAppDispatch, useTypedSelector } from "./utils/hooks";

import Content from "./components/Content";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import Security from "./components/Profile/Security";
import Account from "./components/Profile/Account";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useTypedSelector(selectCurentUserStore);

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute user={!!user} />}>
            <Route path="/profile" element={<Profile />}>
              <Route index element={<Navigate replace to="/profile/account" />} />
              <Route path="/profile/account" element={<Account />} />
              <Route path="/profile/security" element={<Security />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
