import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const openMenu = () =>{
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="header">
              <div className="brand">
                  <button onClick={openMenu}>&#9776;</button>
                  <Link to="/">W a n n a S h o p</Link>
              </div>
              <div className="header-links">
                  {
                    userInfo && userInfo.isAdmin === true ? 
                    <Link to="/products">Add Product</Link> 
                    : ''
                  }
                  {
                    userInfo && userInfo.isAdmin === true ? 
                    <Link to="/productlist">Product List</Link>
                    : ''
                  }
                  {
                    userInfo ? <Link to={"/cart/" + userInfo._id + "?"}>Cart</Link> : ''
                  }
                  {
                    userInfo ? <Link to="/profile">{userInfo.name}</Link>
                    : (<Link to="/signin">Sign In</Link>
                    )}
              </div>
          </header>
          <aside className="sidebar">
            <div>
              {/* <Route
                render={({history}) =>  <SearchBox history={history}></SearchBox>}>
              </Route> */}
            </div>
              <h4>Shopping Categories</h4>
              <button className="sidebar-close-button" onClick={closeMenu}>X</button>
              <ul className="categories">
                <li>
                  {/* <button onClick={() => setSidebarIsOpen(false)} className="close-sidebar"
                  type="button"
                  >

                  </button> */}
                </li>
                {loadingCategories? (<p>Loading...</p>)
                  :
                  errorCategories? (<p>{errorCategories}</p>)
                  :
                  (
                    categories.map((c) => (
                      <li key={c.name}>
                        <Link to={`/search/category/${c.name}`}
                        onClick={() => setSidebarIsOpen(false)}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))
                  )}
              </ul>
          </aside>
          <main className="main">
              <div className="content">
                <Route path="/signin" exact={true} component={SigninScreen} />
                <Route path="/register" exact={true} component={RegisterScreen} />
                <Route path="/profile" exact={true} component={ProfileScreen} />
                <Route path="/products" exact={true} component={ProductsScreen} />
                <Route path="/shipping" exact={true} component={ShippingScreen} />
                <Route path="/payment" exact={true} component={PaymentScreen} />
                <Route path="/placeorder" exact={true} component={PlaceOrderScreen}/>
                <Route path="/product/:id" exact={true} component={ProductScreen} />
                <Route path="/product/:id/edit" exact={true} component={ProductEditScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/" exact={true} component={HomeScreen} />
                <Route path="/productlist" component={ProductListScreen}></Route>
                <Route path="/search/name/:name?" component={SearchScreen} exact={true}></Route>
                <Route path="/search/category/:category?" component={SearchScreen} exact={true}></Route>

              </div>
          </main>
          <footer className="footer">
              All right reserved.
          </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
