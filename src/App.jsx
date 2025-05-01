import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import MyProducts from "./pages/MyProducts";
import UpdateItem from "./pages/UpdateItem";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TopUp from "./pages/TopUp"; 
import RequireAuth from "./components/RequireAuth";
import Transaction from "./pages/Transaction";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/transactions" element={<RequireAuth><Transaction /></RequireAuth>} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/create-item"
        element={
          <RequireAuth>
            <CreateItem />
          </RequireAuth>
        }
      />
      <Route
        path="/my-products"
        element={
          <RequireAuth>
            <MyProducts />
          </RequireAuth>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <RequireAuth>
            <UpdateItem />
          </RequireAuth>
        }
      />
      <Route
        path="/topup"
        element={
          <RequireAuth>
            <TopUp />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
