import React, {useState} from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import ImageModal from './ImageModal.jsx';
import Placeholder from '../../../assets/Placeholder.jpeg'
var axios = require('axios');

export default function IndividualAnswer({index, answer}) {

  var [helpful, setHelpful] = useState(answer.helpfulness);
  var [report, setReport] = useState(true);
  var [yesVote, setYesVote] = useState(false);
  var [toggleImage, setToggleImage] = useState(false);
  var [url, setUrl] = useState('');

  var parse = (date) => {
    var dateISO = parseISO(date.slice(0,10));
    return format(dateISO, "MMMM dd, yyyy")
  };

  // need to refactor so that it stops upvoting through the delay
  var upVote = (e) => {
    e.preventDefault();
    axios.put('/snuggie/answer/helpfulness', {answer_id: answer.id})
    .then((results) => {
      setHelpful(helpful + 1);
      setYesVote(true);
    })
    .catch((error) => {
      console.log('Error within upvoting helpfulness from client side')
    })

  };

  var reportClick = (e) => {
    e.preventDefault();
    axios.put('/snuggie/report', {answer_id: answer.id})
    .then(() => {})
    .catch((error) => {
      console.log("Error in reporting from client side")
    })
    setReport(false);
  }

  var handleToggle = (e) => {
    e.preventDefault();
    setToggleImage(true);
    setUrl(e.target.src)
  }

  return (
    <IndividualAnswerContainer>
      <IndividualAnswerBody>
        {index === 0 && <AnswerSpan>A: {answer.body}</AnswerSpan>}
        {index !== 0 && <AnswerSpan>{answer.body}</AnswerSpan>}
        {/* <AnswerSpan>{answer.body}</AnswerSpan> */}
        <ImageSection>
        {answer.photos?.map((each, i) => {
          return (
            <Images onClick={handleToggle} key={i} src={each || Placeholder}  />
          )
        })}
        {toggleImage && <ImageModal toggleImage={setToggleImage} url={url}/>}
      </ImageSection>
        <BottomInfoContainer>
          <PosterAndDateSpan> By {answer.answerer_name} on {parse(answer.date)} </PosterAndDateSpan>
          <span> | </span>
          <AnswerHelpfulnessSpan>
            Helpful?
           {!yesVote && <YesAnswerSpan onClick={upVote}>Yes</YesAnswerSpan> }
           {!yesVote &&  <span>({helpful}) </span>}
           {yesVote && <YesAnswerSpanVoted>Yes</YesAnswerSpanVoted> }
           {yesVote &&  <VotedSpan> ({helpful}) </VotedSpan>}
          </AnswerHelpfulnessSpan>
          <span> | </span>
          {report && <ReportSpan onClick={reportClick}> Report </ReportSpan>}
          {!report && <ReportedSpan> Reported! </ReportedSpan>}
        </BottomInfoContainer>
      </IndividualAnswerBody>
    </IndividualAnswerContainer>
  )
};

// styled components
var IndividualAnswerContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 450px;
  padding: 10px 0 10px 0;
`;

var VotedSpan = styled.span`
  color: #007185;
  font-size: 12.3px;
`;

var ImageSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

var Images = styled.img`
  width: 75px;
  height: 75px;
  margin: 10px;
  border-radius: 12px;
  object-fit: cover;
  :hover {
    cursor: pointer;
    border: 2px solid black;
    border-color: #EF8354;
  }
`;



var YesAnswerSpanVoted = styled.span`
  text-decoration: underline;
  color: #007185;
  font-size: 12.3px;
  padding-left: 5px;
  padding-right: 2px;
`;

var IndividualAnswerBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
`;

var YesAnswerSpan = styled.span`
  text-decoration: underline;
  font-size: 12.3px;
  :hover {
    cursor: pointer;
    color: #007185;
  };
  padding-left: 5px;
  padding-right: 2px;
`;

var ReportedSpan = styled.span`
  text-decoration: underline;
  color: red;
  font-size: 12.3px;
  padding-left: 7px;
  padding-right: 1px;
`;

var AnswerSpan = styled.span`
  font-family: 'Nanum Gothic Coding', monospace;
  height: 1rem;
  padding-bottom: 5px;
  font-size: 20px;
`;

var ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

var BottomInfoContainer = styled.div`
  font-family: 'Nanum Gothic Coding', monospace;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 200px%;
  font-size: 10.5px;
  padding-top: 2px;
`;

//adjust
var PosterAndDateSpan = styled.span`
  height: 1.2rem;
  font-size: 12.3px;
  padding-left: 1px;
  padding-right: 7px;
`;

//adjust
var AnswerHelpfulnessSpan = styled.span`
  padding-left: 7px;
  padding-right: 7px;
  font-size: 12.3px;
`;

//adjust
var ReportSpan = styled.span`
  text-decoration: underline;
  font-size: 12.3px;
  :hover {
    cursor: pointer;
    color: #007185;
  };
  padding-left: 7px;
  padding-right: 1px;
`;


