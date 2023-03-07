import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Layout } from "../pages/Layout";
import { MangaDetails } from "../pages/MangaDetails";
import { Chapter } from "../pages/Chapter/Chapter";
import { Login } from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { AnonymousRoute } from "./AnonymousRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <AnonymousRoute>
              <Login />
            </AnonymousRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
          <Route path="/manga/:id/:chapter" element={<Chapter />} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </>
  );
}