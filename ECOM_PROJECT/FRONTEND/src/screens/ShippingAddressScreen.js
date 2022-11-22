import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'
import { useState, useEffect, useContext, React } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom'

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }

  }, [userInfo, navigate])


  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  }

  return (<>
    <div className='ship'>
      <Helmet>
        Shippig Address
      </Helmet>
      <div className="container small-container">
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId="fullname">
            <Form.Label>FULL NAME</Form.Label>
            <Form.Control className='inp' value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
          </Form.Group>
          <Form.Group className='mb-3' controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control className='inp' value={address} onChange={(e) => { setAddress(e.target.value) }} />
          </Form.Group>
          <Form.Group className='mb-3' controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control className='inp' value={city} onChange={(e) => { setCity(e.target.value) }} />
          </Form.Group>
          <Form.Group className='mb-3' controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control className='inp' value={postalCode} onChange={(e) => { setPostalCode(e.target.value) }} />
          </Form.Group>
          <Form.Group className='mb-3' controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control className='inp' value={country} onChange={(e) => { setCountry(e.target.value) }} />
          </Form.Group>
          <div className="mb-3">
            <Button varient='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  </>);
}