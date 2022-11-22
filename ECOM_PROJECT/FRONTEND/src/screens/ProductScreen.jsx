import React from 'react'
import axios from 'axios'
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Product from '../components/Product'
import {useEffect,useReducer,useState, createContext, useContext} from 'react'
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import Rating from '../components/Rating'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import {getError} from '../utils'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { Store  } from '../Store';
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};



function ProductScreen() {

    const params=useParams()
    const {slug}=params;


    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {

            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload:getError(err) })  
            }

        };
        fetchData();
    }, [slug]);






    const { state, dispatch: ctxDispatch } = useContext(Store);
const {cart}=state;

const addtocart = async () => {
    const existItem=cart.cartItems.find(x=>x._id=products._id)
    const quantity = existItem?existItem.quantity+1:1 
    const {data} = await axios.get(`/api/products/${products._id}`)
    if(data.countInStock<quantity) {
        window.alert("Sorry , Product purchase limit exceeded")
    }
    ctxDispatch({type:'CART_ADD_ITEM', payload:{...products,quantity}})
    
  };












  return loading?(
    <div><LoadingBox/></div>
  ):error?(<div> <MessageBox variant="danger"> {error}</MessageBox></div>):(
    <div>'
    
    <Row>
        <Col  md={6}>
            <img  className='img-large'  src={products.image} alt={products.name} />
        </Col>
        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h1>{products.name}</h1>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <Rating   rating={products.rating} numReviews={products.numReviews}  />
                </ListGroup.Item>
                <ListGroup.Item>
                    <h5>Price : $ {products.price}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p><b>Description : </b> {products.description} </p>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
        <Card.Body>
        <ListGroup  variant='flush'>
            <ListGroup.Item>
                <Row>
                    <Col>Price:</Col>
                    <Col>${products.price}</Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    <Col>Status:</Col>
                    <Col>{products.countInStock>0?<Badge bg="success">In Stock</Badge>:<Badge bg="danger">Unavailiable</Badge>     }</Col>
                </Row>
            </ListGroup.Item>
            {
                products.countInStock > 0 && (
                    <ListGroup.Item>
                        <div className="d-grid">
                            <Button  variant="primary"  onClick={addtocart} >
                                Add to Cart
                            </Button>
                        </div>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
        </Card.Body>
        </Card>
        </Col>
        
    </Row>
    
    </div>
  )
}

export default ProductScreen