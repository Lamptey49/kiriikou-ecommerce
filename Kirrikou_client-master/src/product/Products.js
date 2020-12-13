import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import AddToCart from './../'
export default function Products(props){
    return (
        <div className='root'>
            {
            props.products.length > 0 ? 
            (<div className='container'>
                <div className='grid'>
                    {props.products.map((product, i) => (
                        <div className='tile' key={i}>
                            <Link to={'/product/'+product._id}>
                                <img className='image' src={'/api/product/image/'+product._id} alt={product.name}/>
                            </Link>
                            <div className='tilebar'>
                                <Link to={'/product/'+product._id} className='tileTitle'>{product.name}</Link>
                                <span>$ {product.price}</span>
                                {/* <AddToCart item={product}/> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>) : props.searched && (<p>No Products Found!</p>)
            }
        </div>
    )
}
Products.propTypes = {
    products: PropTypes.array.isRequired,
    searched: PropTypes.bool.isRequired
}