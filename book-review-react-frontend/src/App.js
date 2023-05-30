import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Missing from "./components/Missing";
import UserRegisterForm from "./components/UserRegisterForm";
import UserLoginForm from "./components/UserLoginForm";
import UnauthorizedForm from "./components/UnauthorizedForm";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import BookDetails from "./components/BookDetails";
import RequireAuth from "./components/RequireAuth";
import Author from "./components/Author";
import UserBooks from "./components/UserBooks";
import UserReviews from "./components/UserReviews";
import useToken from "./hooks/useToken";
import UserAuthors from "./components/UserAuthors";

function App() {
  const { token } = useToken();
  console.log(token);
  return (
    <div className="background">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<UserLoginForm />} />
            <Route path="/" element={<UserRegisterForm />} />
            <Route path="/unauthorized" element={<UnauthorizedForm />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/search" element={<Search />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/mybooks" element={<UserBooks />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/myreviews" element={<UserReviews />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/myauthors" element={<UserAuthors />} />
            </Route>

            <Route
              exact
              path="/bookdetail/works/:key/:isbn/:author"
              element={<BookDetails />}
            />
            <Route exact path="/author/:author" element={<Author />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
