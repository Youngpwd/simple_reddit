import React from "react";
import { Route, Routes } from "react-router";
import Header from "../components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="search" />
        <Route path="r">
          <Route path=":subreddit" />
        </Route>
      </Routes>
    </>
  );
};

export default App;
