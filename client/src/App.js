import ProductContextProvider from './Context/Product';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Home from './components/layout/Home/Home';
import AuthContextProvider from './Context/Auth';

function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
