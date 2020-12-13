import React, { useState, useEffect } from 'react';
import {Carousel,CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';
// import Footer from './FooterComponent.js';
import bagImage from './../assets/images/slider-1.jpg'
import shoeImage from './../assets/images/slider-2.jpg'
import foodImage from './../assets/images/slider-3.jpg'
import cat_1 from './../assets/images/category-1.jpg'
import cat_2 from './../assets/images/category-2.jpg'
import { listCategories, listLatest } from './../product/api-product'
import Suggestions from './../product/Suggestions'
import Search from './../product/Search'
import Categories from './../product/Categories'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
}))

const items = [
  {
    src: bagImage,
    altText: 'Slide one',
    caption:`${<button className='btn btn-primary'><i className="fa fa-shopping-cart"></i>Shop Now</button>}`
  },
  {
    src: foodImage,
    altText: 'Slide two',
    caption:`${<button  className='btn btn-primary'><i className="fa fa-shopping-cart"></i>Shop Now</button>}`
  },
  {
    src: shoeImage,
    altText: 'Slide three',
  caption:`${<button  className='btn btn-primary'><i className="fa fa-shopping-cart"></i>Shop Now</button>}`
  }
];
const  Home = (props)=> {
const classes =  useStyles()
const [activeIndex, setActiveIndex] = useState(0)
const [animating, setAnimating] = useState(false)
const [suggestionTitle, setSuggestionTitle] = useState('Featured Products')
const [categories, setCategories] = useState([])
const [suggestions, setSuggestions] = useState([])

useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listLatest(signal).then((data)=>{
      if(data.error){
        console.log(data.errror)
      }
      else{
        setSuggestions(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
    
}, [])
useEffect(() => {
  const abortController = new AbortController()
  const signal = abortController.signal
  listCategories(signal).then((data) =>{
    if(data.error){
      console.log(data.error)
    }
    else{
      setCategories(data)
    }
  })
  return function cleanup() {
    abortController.abort()
  }
}, [])
const next = ()=>{
  if(animating) return;
  const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  setActiveIndex(nextIndex)
}

const previous = ()=>{
  if(animating) return;
  const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  setActiveIndex(nextIndex)
}

const gotoIndex = (newIndex)=> {
  if(animating) return;
  setActiveIndex(newIndex)
}

const slides = items.map((item,index)=> {
  return(

    <CarouselItem 
    onExiting={()=> setAnimating(true)}
    onExited={()=> setAnimating(false)}
    key={index} >
      <img src={item.src} alt={item.altText } height='300px' width='900px' />
      <CarouselCaption captionText={item.caption} captionHeader={item.altText} />
    </CarouselItem>
  )
})
    return(
    <>

<div className={classes.root}>
<Grid container spacing={2}>
  <Grid item xs={8} sm={8}>
    <Search categories={categories}/>
   
  </Grid>
  <Grid item xs={4} sm={4}>
    <Suggestions products={suggestions} title={suggestionTitle}/>
  </Grid>
</Grid>
<div className='header'>
  <div className="container-fluid"> 
    <div className='row'>
      <div className="col-md-3">
        <nav className="navbar bg-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-home"></i> Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-shopping-bag"></i> Best Selling</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-plus-square"></i> New Arrivals</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-female"></i> Fashion & Beauty</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-child"></i> Kids & Babies Clothes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-dress"></i> Men & Women Clothes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-phone"></i> Gadgets & Accessories</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#"><i className="fa fa-microchip"></i> Electronics & Accessories</Link>
                </li>
            </ul>
        </nav>
        </div>
          <div className='col-md-6'>
              <Carousel 
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={gotoIndex}  />
                {slides}
                <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
                <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
              </Carousel>
          </div>
          <div className="col-md-3">
              <div className="header-img">
                  <div className="img-item">
                      <img src={cat_1} alt='category-1' width="300px" height='120px' />
                      <Link className="img-text" to="">
                          <p>Some text goes here that describes the image</p>
                      </Link>
                  </div>
                  <div className="img-item">
                      <img src={cat_2} alt='category-2' width="300px" height='120px' />
                      <Link className="img-text" to="">
                          <p>Some text goes here that describes the image</p>
                      </Link>
                  </div>
            </div>       
          </div>
      </div>
  </div>  
</div>
<Grid container spacing={2}>
  <Grid item xs={8} sm={8}>
  <Categories categories={categories}/>
  </Grid>
</Grid>
</div>
{/* <div id="sitewrapper" >
  <Footer/>
</div> */}
</> 

    )
}
  
export default Home;