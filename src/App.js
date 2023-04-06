import "./App.css";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./accounts/Signup";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
