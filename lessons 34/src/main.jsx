import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import Products from "./components/Products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProductsItem from "./components/ProductsItem/ProductsItem";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products-item" element={<ProductsItem />} />
      </Routes>
    </Router>
  </Provider>
);
