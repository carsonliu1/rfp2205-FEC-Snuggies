import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import StarBreakDown from '../OverallBreakDown/RatingsBreakdown.jsx'
import StarRating from '../../SharedComponents/StarRating.jsx'
import {Done, Progress, BodyContainer, AllStarsBodyContainer} from '../../RatingsAndReviews/StyledComponents/BreakdownBars.jsx'
import {RRContainer, SingleBar, BarText} from '../../RatingsAndReviews/StyledComponents/R&RContainer.jsx'
import ProductBreakDown from '../OverallBreakDown/ProductBreakdown.jsx'

const OverAllBreakDown = (props) => {//done
	// console.log(props
	// 	, 'prooooss')
	const [averageStars, setAverageStars] = useState(0);
	const [recommendProduct, setRecommendProduct] = useState(0);
	const [filterArray, setFilterArray] = useState([])
  const [fiveRatingFilter, setFiveRatingFilter] = useState(false)
  const [fourRatingFilter, setFourRatingFilter] = useState(false)
  const [threeRatingFilter, setThreeRatingFilter] = useState(false)
  const [twoRatingFilter, setTwoRatingFilter] = useState(false)
  const [oneRatingFilter, setOneRatingFilter] = useState(false)

	var filterReviews = (ratingNum) => {
    //filter based on toggles
    let filtered = props.productReviews.results.filter((review) => {
			return(
      (fiveRatingFilter === true && review.rating === 5)  ||
      (fourRatingFilter === true && review.rating === 4) ||
      (threeRatingFilter === true && review.rating === 3) ||
      (twoRatingFilter === true && review.rating === 2) ||
      (oneRatingFilter === true && review.rating === 1)
			)
    });
    setFilterArray(filtered)
		return filtered
  }

  var filterToggle = (ratingNum) => {
		if(ratingNum === 5) {
      setFiveRatingFilter(!fiveRatingFilter)
			console.log('five filter', fiveRatingFilter)
    }
    if(ratingNum === 4) {
      setFourRatingFilter(!fourRatingFilter)
			console.log('four filter', fourRatingFilter)
    }
    if(ratingNum === 3) {
      setThreeRatingFilter(!threeRatingFilter)
			console.log('three filter', threeRatingFilter)
    }
    if(ratingNum === 2) {
      setTwoRatingFilter(!twoRatingFilter)
			console.log('two filter', twoRatingFilter)
    }
     if(ratingNum === 1) {
      setOneRatingFilter(!oneRatingFilter)
			console.log('one filter', oneRatingFilter)
    }
    console.log(fiveRatingFilter)
	}

	var filterOnClick = (event) => {
		var numValue = Number(event.target.getAttribute('value'))
		filterToggle(numValue)
		let filteredResults = filterReviews(numValue)
		props.filteredReviews(filteredResults)
	}

  var capToFourth = (number) => {
  return (25 * Math.floor(number / 25));
}

useEffect(() => {
	if(props.reviewData) {
	  let rating = 0;
	  let data = props.reviewData;
	  rating = (data["1"] * 1) + (data["2"] * 2) + (data["3"] * 3) + (data["4"] * 4) + (data["5"] * 5);
	  var average = rating / (data["1"] * 1 + data["2"] * 1 + data["3"] * 1 + data["4"] * 1 + data["5"] * 1)
		var roundedAverage = Math.floor(average * 4) / 4
		setAverageStars(roundedAverage);
	}


	if(props.metaData.recommended ) {
    var recommendTotal = Number(props.metaData.recommended.false) + Number(props.metaData.recommended.true);
		var recommendedAverage = (props.metaData.recommended.true / recommendTotal);
		setRecommendProduct((Math.floor(recommendedAverage * 100)));
	}
}, [props.reviewData, props.metadata]);



	return (
		<div>

			<h1>{averageStars && averageStars}</h1>
		<StarRating reviewData={props.reviewData} />
		<div> {recommendProduct}% of reviews recommend this product</div>
		<AllStarsBodyContainer>
			<SingleBar>
				<BarText value='5' onClick={filterOnClick}>5 stars</BarText><StarBreakDown done={props.fiveTotal}/>
			</SingleBar>
			<SingleBar>
			  <BarText value='4' onClick={filterOnClick}>4 stars</BarText><StarBreakDown done={props.fourTotal}/>
			</SingleBar>
			<SingleBar>
			  <BarText value='3' onClick={filterOnClick}>3 stars</BarText><StarBreakDown done={props.threeTotal}/>
			</SingleBar>
			  <SingleBar>
			  <BarText value='2' onClick={filterOnClick}>2 stars</BarText><StarBreakDown done={props.twoTotal}/>
			</SingleBar>
			<SingleBar>
			  <BarText value='1' onClick={filterOnClick}>1 stars</BarText><StarBreakDown done={props.oneTotal}/>
			</SingleBar>
		</AllStarsBodyContainer>
		  <ProductBreakDown characteristics={props.metaData.characteristics}/>
		</div>
	)
}
export default OverAllBreakDown