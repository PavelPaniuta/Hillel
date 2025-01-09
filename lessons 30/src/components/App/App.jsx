import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import SwapiInput from "../SwapiInput/SwapiInput";
import SwapiResult from "../SwapiResult/SwapiResult";
import Footer from "../Footer/Footer";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>SWAPI</h1>
        <SwapiInput />
        <SwapiResult />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
