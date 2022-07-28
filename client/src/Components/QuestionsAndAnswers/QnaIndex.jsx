import React, {useState, useEffect, useContext} from 'react';
import SearchQuestions from './Form/SearchQuestions.jsx';
import QuestionsList from './QuestionWithAnswers/QuestionsList.jsx';
import MoreAnsweredQuestions from './BottomTabs/MoreAnsweredQuestions.jsx';
import AddQuestion from './BottomTabs/AddQuestion.jsx';
import styled from 'styled-components';
const axios = require('axios');
import {GlobalContext} from '../../App.js';


var QnaIndex = ({ chosenProduct, productId }) => {
  var storage = useContext(GlobalContext);
  // var { _productId } = storage;

  const [question, setQuestion] = useState([]);
  const [defaultQ, setDefaultQ] = useState([]);
  const [len, setLen] = useState(2);
  const [toggleModal, setToggleModal] = useState(false);
  const [filter, setFilter] = useState();
  const [noSearch, setNoSearch] = useState(false);
  const [urlImage, setURLImage] = useState([]);

  var questionSort = question.results?.slice(0, len);

  useEffect(() => {
    if(productId) {
      axios.get('/snuggie/qa/questions', {params : {product_id: productId, count: 100}} )
      .then((response) => {
        console.log(response.data)
        setQuestion(response.data);
        setDefaultQ(response.data);
      })
      .catch((error) => {
        console.log('Error in retrieving question list from server', error);
      });
    }
  }, [productId]);

  var search = (query) => {

    var query = query.toLowerCase();

    if (query.length > 2) {
      // filter questions
      var filtered = defaultQ.results.filter((e) => e.question_body.toLowerCase().includes(query))

      // filter answers
      var answers = [];

      for (var i = 0; i < question.results.length; i++) {
        var currentQ = question.results[i];
        for (var key in currentQ.answers) {
          if (currentQ.answers[key].body.toLowerCase().includes(query)) {
            answers.push(currentQ)
          }
        }
      };

      // filter out any duplicates from concating the questions and answers
      var combo = filtered.concat(answers);

      var unique = combo.filter((e, index) => {
        return combo.indexOf(e) === index;
      })

      setFilter(unique)
    };

    if (query.length < 2) {
      setFilter()
    };

    if (filtered.length === 0 && answers.length === 0) {
      setNoSearch(true);
    } else {
      setNoSearch(false);
    };

  };

  var loadQ = () => {
    return setLen(len + 2)
  };

  var postAnswer = (body) => {
    axios.post('/snuggie/post/answer', body)
    .then((response) => {
       axios.get('/snuggie/qa/questions', {params : {product_id: productId, count: 10000}})
      .then((response) => {
        setQuestion(response.data);
        setDefaultQ(response.data);
      })
    })
    .catch((error) => {
      console.log('error within posting answer from client')
    })
  };

  var postQuestion = (body) => {
    axios.post('/snuggie/post/question', body)
    .then(() => {
      axios.get('/snuggie/qa/questions', {params : {product_id: productId, count: 100}})
      .then((response) => {
        setQuestion(response.data);
        setDefaultQ(response.data);
      })
      .catch((error) => {
        console.log('error within getting data after posting question from client')
      })
    })
    .catch((error) => {
      console.log('error within posting question from client side')
    })
  };

  return (
    <QnAContainer id='QnA'>
        <Header> Questions and Answers </Header>
        <SearchQuestions search={search}/>
        {noSearch && <h2> NO SEARCH RESULT</h2>}
        <QuestionScrollDiv>
          <QuestionsList urlImage={urlImage} chosenProduct={chosenProduct} productId={productId} setURLImage={setURLImage} postAnswerFunc={postAnswer} filter={filter} questions={questionSort} />
        </QuestionScrollDiv>
      <BottomTabContainer>
      {len < question.results?.length && question.results.length > 2  && <MoreAnsweredQuestions loadMore ={loadQ} />}
        <AddQuestionButton chosenProduct={chosenProduct} productId= {productId} onClick={() =>setToggleModal(true)}> Add Question + </AddQuestionButton>
        {toggleModal &&  <AddQuestion productId={productId} chosenProduct={chosenProduct} postQuest={postQuestion} toggleModel={setToggleModal}/> }
      </BottomTabContainer>
    </QnAContainer>
  )
};

// styled components
var QnAContainer = styled.section`
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  background-color: rgb(255, 255, 255);
  width: 1354px;
  border-radius: 10px;
  box-shadow: 0px 0.4rem 1.5rem rgb(0 0 0 / 25%);
`;

var Header = styled.h1`
  padding-left: 265px;
  font-family: 'Nanum Gothic Coding', monospace;
  font-weight: bold;
  font-size: 35px;
  position: relative;
  left: 220;
`;

var AddQuestionButton = styled.button`
  font-family: 'Nanum Gothic Coding', monospace;
  border: 2.4px solid black;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
  font-size: 17px;
  background-color: white;
  margin: 10px;
  :hover {
    cursor: pointer;
    background-color: #EF8354;
  };
`;

var BottomTabContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

var QuestionScrollDiv = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;

`;

var ImageSupreme = styled.img`
  opacity: 0.5;
  position: absolute;
  right: 10px;
`
export default QnaIndex


