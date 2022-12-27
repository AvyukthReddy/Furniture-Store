// client/src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import "./App.css";
import Nav from "./components/nav/Nav";
import User from "./components/user/User";
import Orders from "./components/orders/Orders";
import Cart from "./components/cart/Cart";
import Products from "./components/products/Products";
import Product from "./components/products/Product";
import OrderDetails from "./components/orders/OrderDetails";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AdminOrders from "./components/admin/orders/AdminOrders";
import Profile from "./components/Profile/Profile";

function App() {
  const customer_id = useSelector(state => state.customerDetails?.customer_id);

  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Nav />
          </header>
          <div className="App-content">
            <Routes>
              <Route exact path='/' element={< Products />}></Route>
              <Route exact path='/login' element={< User />}></Route>
              <Route exact path='/orders' element={<Protected isLoggedIn={customer_id != null}> < Orders /> </Protected>}></Route>
              <Route exact path='/cart' element={<Protected isLoggedIn={customer_id != null}> < Cart /> </Protected>}></Route>
              <Route exact path='/product/:id' element={< Product />}></Route>
              <Route exact path='/order/:orderId' element={<Protected isLoggedIn={customer_id != null}> < OrderDetails /> </Protected>}></Route>
              <Route exact path='/dashboard' element={< Dashboard />}></Route>
              <Route exact path='/adminOrders' element={ < AdminOrders />}></Route>
              <Route exact path='/profile' element={<Protected isLoggedIn={customer_id != null}> < Profile /> </Protected>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;