import React from "react";
import './App.css';
import {ToastContainer} from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppToolbar from "./componenets/UI/Toolbar/AppToolbar";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
        <CssBaseline/>
        <ToastContainer
            draggable={false}
            hideProgressBar
            autoClose={3000}
            style={{ width: 250}}
        />
        <AppToolbar/>
        <Routes/>
    </div>
  );
}

export default App;
