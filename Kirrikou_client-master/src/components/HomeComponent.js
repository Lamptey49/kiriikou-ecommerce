
import React, { useState } from 'react';
import {Carousel,CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';
// import Footer from './FooterComponent.js';
import bagImage from './../assets/images/slider-1.jpg'
import shoeImage from './../assets/images/slider-2.jpg'
import foodImage from './../assets/images/slider-3.jpg'
import cat_1 from './../assets/images/category-1.jpg'
import cat_2 from './../assets/images/category-2.jpg'

import { Link } from 'react-router-dom';

const items = [
  {
    src: bagImage,
    altText: 'Slide one',
    caption:<button className='btn btn-primary'><i class="fa fa-shopping-cart"></i>Shop Now</button>
  },
  {
    src: foodImage,
    altText: 'Slide two',
    caption:<button  className='btn btn-primary'><i class="fa fa-shopping-cart"></i>Shop Now</button>
  },
  {
    src: shoeImage,
    altText: 'Slide three',
    caption:<button  className='btn btn-primary'><i class="fa fa-shopping-cart"></i>Shop Now</button>
  }
];
const  Home = (props)=> {

const [activeIndex, setActiveIndex] = useState(0)
const [animating, setAnimating] = useState(false)

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
<div className='header'>
<div className="container-fluid"> 
  <div className='row'>
    <div className="col-md-3">
      <nav className="navbar bg-light">
          <ul className="navbar-nav">
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-home"></i>Home</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-shopping-bag"></i>Best Selling</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-plus-square"></i>New Arrivals</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-female"></i>Fashion & Beauty</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-child"></i>Kids & Babies Clothes</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-tshirt"></i>Men & Women Clothes</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-mobile-alt"></i>Gadgets & Accessories</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="#"><i className="fa fa-microchip"></i>Electronics & Accessories</Link>
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
  {/* <div id="sitewrapper" >
    <Footer/>
  </div> */}
</> 

    )
}
  
export default Home;