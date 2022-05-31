import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>

      <Routes>
        <Route path="/products/:category" element={<ProductList />}></Route>
      </Routes>

      <Routes>
        <Route path="/product/:id" element={<ProductPage />}></Route>
      </Routes>

      <Routes>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>

      <Routes>
        {user ? <Navigate to="/" /> : <Login />}
        <Route path="/login" element={<Login />}></Route>
      </Routes>

      <Routes>
        {user ? <Navigate to="/" /> : <Register />}
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
