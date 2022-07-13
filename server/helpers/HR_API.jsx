// The helper functions that directly interact with Hack Reactor's API to do stuff (e.g. get products, get certain products, add to cart, etc.)
const axios = require('axios');
const config = process.env.GITHUB_TOKEN; // In your .env file, add your github token (see Learn's section on the API)

// An object that will be the header sent with the request.
// It just contains our github token (this is so we don't have to keep repeating ourselves)
var headers = {
  'Authorization': config
}

// Function that sends a GET request to the API to get all the products
var getAllProducts = () => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
    headers: headers
  });
}

// Function that sends a GET request to the API to get a specific product
// Input: the product ID of the specific product
var getProduct = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
    headers: headers
  });
}

// Function that sends a GET request to the API to get a specific product's styles
// Input: the product ID of the specific product
var getProductStyles = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`, {
    headers: headers
  });
}

//RATINGS AND REVIEWS
var getProductReviews = (id, count) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${count}`, {
    headers: headers
  });
}

var postProductReviews = () => {
  return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`, {
    headers: {
      headers: headers
    }
  });
}

var getRelatedProducts = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, {
    headers: {headers}
  });
}

var getProductQuestion = (id, count) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${id}&count=${count}`, {
    headers: headers
  });
};

var getProductAnswer = (id, count) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/answers/?count=${count}`, {
    headers: headers
  });
};

var updateQuestionHelpfulness = (id) => {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/helpful`, {
    headers: headers
  });
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.getProductStyles = getProductStyles;
module.exports.getProductReviews = getProductReviews;
module.exports.postProductReviews = postProductReviews;
module.exports.getRelatedProducts = getRelatedProducts;
module.exports.getProductQuestion = getProductQuestion;
module.exports.getProductAnswer = getProductAnswer;
module.exports.updateQuestionHelpfulness = updateQuestionHelpfulness;
