// The helper functions that directly interact with Hack Reactor's API to do stuff (e.g. get products, get certain products, add to cart, etc.)
const axios = require('axios');
const config = process.env.GITHUB_TOKEN; // In your .env file, add your github token (see Learn's section on the API)

// An object that will be the header sent with the request.
// It just contains our github token (this is so we don't have to keep repeating ourselves)
var headers = {
  'Authorization': config
}

// Function that sends a GET request to the API to get all the products (defaulting to asking for 2000 products; there are currently ~1100)
var getAllProducts = () => {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products?count=2000', {
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

var getProductMetaData = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${id}`, {
    headers: headers
  });
}

var getProductReviews = (id, count, sort) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${id}&count=${count}&sort=${sort}`, {
    headers: headers
  });
}

// Function that sends a GET request to the API to get a specific product's review metadata
var getReviewMetadata = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${id}`, {
    headers: headers
  });
}

var postProductReviews = (data) => {
  return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`, data, {
    headers: headers
  });
}

var updateReviewsHelpfulness = (id, data) => {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`, data, {
    headers: headers
  });
};

var reportReview = (id, data) => {
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/report`, data, {
    headers: headers
  });
}

var getRelatedProducts = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`, {
    headers: {headers}
  });
}

var getProductQuestion = (id, count) => {
  return axios.get(`http://localhost:3000/qa/questions/?product_id=${id}&count=${count}`, {
    headers: headers
  });
};

var getProductAnswer = (id, count) => {
  return axios.get(`http://localhost:3000/qa/questions/${id}/answers/?count=${count}`, {
    headers: headers
  });
};

var updateQuestionHelpfulness = (id, data) => {
  return axios.put(`http://localhost:3000/qa/questions/${id}/helpful`, data, {
    headers: headers
  });
};

var postAnswer = (id, data) => {
  return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/answers`, data, {
    headers: headers
  })
};

var updateAnswerHelpfulness = (id, data) => {
  return axios.put(`http://localhost:3000/qa/answers/${id}/helpful`, data, {
    headers: headers
  });
};

var postQuestion = (data) => {
  return axios.post(`http://localhost:3000/qa/questions`, data, {
    headers: headers
  });
};

var reportAnswer = (id, data) => {
  return axios.put(`http://localhost:3000/qa/answers/${id}/report`, data, {
    headers: headers
  });
};

// Function that sends a POST request to add the product (specified by sku_id) to the cart
// Input: the sku_id of the product
var addToCart = (sku_id) => {
  return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`, {sku_id: sku_id}, {
    headers: headers
  });
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.getProductStyles = getProductStyles;
module.exports.getProductReviews = getProductReviews;
module.exports.getReviewMetadata = getReviewMetadata;
module.exports.postProductReviews = postProductReviews;
module.exports.getRelatedProducts = getRelatedProducts;
module.exports.getProductQuestion = getProductQuestion;
module.exports.getProductAnswer = getProductAnswer;
module.exports.updateQuestionHelpfulness = updateQuestionHelpfulness;
module.exports.postQuestion = postQuestion;
module.exports.updateAnswerHelpfulness = updateAnswerHelpfulness;
module.exports.getProductMetaData = getProductMetaData
module.exports.postAnswer= postAnswer;
module.exports.reportAnswer= reportAnswer;
module.exports.addToCart = addToCart;
module.exports.updateReviewsHelpfulness= updateReviewsHelpfulness;
module.exports.reportReview= reportReview;
