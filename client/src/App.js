import ProductContextProvider from './Context/Product';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Home from './components/layout/Home/Home';
import AuthContextProvider from './Context/Auth';
import CartContextProvider from './Context/Cart';
import ProductDetails from './components/layout/DetailsProduct/ProductDetails';
import Navbar from './components/view/nav/Navbar';
import Cart from './components/Cart/Cart';
import StallContextProvider from './Context/Stall';
import MyStall from './components/layout/MyStall/MyStall';
import AddProductPage from './components/layout/Form/AddProductPage';
import EditProductPage from './components/layout/Form/EditProductPage';
import SellerContextProvider from './Context/SellerStall';
import SellerStall from './components/layout/SellerStall/SellerStall';

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <ProductContextProvider>
          <StallContextProvider>
            <SellerContextProvider>
              <Router>
                <Navbar />
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/my-cart">
                    <Cart />
                  </Route>
                  <Route exact path="/my-stall/products">
                    <MyStall />
                  </Route>
                  <Route exact path="/:id">
                    <ProductDetails />
                  </Route>
                  <Route exact path="/stall/add">
                    <AddProductPage />
                  </Route>
                  <Route exact path="/stall/edit">
                    <EditProductPage />
                  </Route>
                  <Route exact path="/:id/stall">
                    <SellerStall />
                  </Route>
                </Switch>
              </Router>
            </SellerContextProvider>
          </StallContextProvider>
        </ProductContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
