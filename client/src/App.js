import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Components/ProductOverview/Overview.jsx';
import QnaIndex from './Components/QuestionsAndAnswers/QnaIndex.jsx';
import RatingsAndReviewsIndex from './Components/RatingsAndReviews/RatingsAndReviewsIndex.jsx'
import RInC from './Components/RelatedItemsAndComparison/RInCIndex.jsx';
import Navbar from './Navbar.jsx';
import styled from 'styled-components';

export const GlobalContext = React.createContext()

var App = () => {

  // Hooks for what specific product is being displayed
  const [productId, setProductId] = useState();
  const [chosenProduct, setChosenProduct] = useState({});
  const [reviewData, setReviewData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  var storage = {
    _productId: productId,
    _chosenProduct: chosenProduct
  };

  // When App first mounts, send a GET request to the server to get the productId of the first product received
  useEffect(() => {
    // Send axios request to get all products
    axios.get('/snuggie/products') // No query/parameters, so this endpoint returns ALL products
      // Then get the specific product
      .then((results) => {
        setAllProducts(results.data)
        return axios.get('/snuggie/products', { params: {product_id: results.data[2].id} });
      })
      // Then set the hooks
      .then((results) => {
        setChosenProduct(results.data);
        setProductId(results.data.id);
      })
      .catch((error) => {
        console.log('An error occurred when initializing data received from server:', error);
      });
  }, []); // Second argument being an empty array causes this instance of useEffect to only run once

  // If chosen product changes, set product id
  useEffect(() => {
    if (Object.keys(chosenProduct).length !== 0) {
      setProductId(chosenProduct.id);
    }
  }, [chosenProduct]);

  // If product id changes, set chosen product
  useEffect(() => {
    if (productId) {
      axios.get('/snuggie/products', { params: {product_id: productId} })
        .then((results) => {
          return setChosenProduct(results.data);
        })
        .then(() => {
          return axios.get('/snuggie/reviews/', {params: {product_id: productId, count: 500, sort: "relevant"}})
        })
        .then((response) => {
          setReviewData(response.data.results);
        })
        .catch((error) => {
          console.log('An error occurred when initializing data received from server:', error);
        })
    }
  }, [productId]);

  var submit = (query) => {
    var filtered = allProducts.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));

    var index = Math.floor(Math.random() * filtered.length);

    if (query.length > 2) {
      setProductId(filtered[index].id);
      setChosenProduct(filtered[index]);
    };

  };

  return(
    <GlobalContext.Provider value={storage}>
      <AppWrapper>
        <div> <Navbar submitFunc={submit} /> </div>
        {/* <h1>ANNOUNCEMENTS GO HERE</h1> */}
        <Overview productId={productId} chosenProduct={chosenProduct} reviewData={reviewData} />
        <br/>
        <RInC productId={productId} chosenProduct={chosenProduct} setProductId={setProductId} setChosenProduct={setChosenProduct}/>
        <br/>
        <QnaIndex productId= {productId} chosenProduct={chosenProduct} />
        <br/>
        <RatingsAndReviewsIndex productId={productId} chosenProduct={chosenProduct}/>
      </AppWrapper>
    </GlobalContext.Provider>
  )
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #828e82;
`;