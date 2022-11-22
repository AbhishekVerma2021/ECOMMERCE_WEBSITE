// import data from './data';
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen';
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store'
import { useContext } from 'react'
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignupScreen from './screens/SignupScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen.js';
function App() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;


  const signOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT ' })
    localStorage.removeItem('userInfo')
    window.location.reload(false)

  }


  return (
    <>

      <BrowserRouter>
        {/* <ShippingAddressScreen /> */}
        <div>
          <header>
            <Navbar bg="dark" varient="dark">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>PosterBazaar</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                  <Link to="/cart" className="nav-link">
                    Cart{
                      cart.cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )
                    }
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown" >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          UserProfile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>
                          orderhistory
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className='dropdown-item' to="#signout" onClick={signOutHandler}>Sign Out</Link>

                    </NavDropdown>
                  ) : (<Link className='nav-link' to="/signin">Sign In</Link>)}

                </Nav>
              </Container>
            </Navbar>

          </header>
          <main>

            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/' element={<HomeScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/#signout' element={<HomeScreen />} />


            </Routes>


          </main>
        </div>
      </BrowserRouter >
    </>
  );
}

export default App;
