import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {listByShop} from './../product/api-product.js'
import DeleteProduct from './../product/DeleteProduct'

export default function MyProducts (props){
    const classes = useStyles()
    const [products, setProducts] = useState([])
    
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      listByShop({
        shopId: props.shopId
      }, signal).then((data)=>{
        if (data.error) {
          console.log(data.error)
        } else {
          setProducts(data)
        }
      })
      return function cleanup(){
        abortController.abort()
      }
    }, [])
  
    const removeProduct = (product) => {
      const updatedProducts = [...products]
      const index = updatedProducts.indexOf(product)
      updatedProducts.splice(index, 1)
      setProducts(updatedProducts)
    }

    return (
        <div className='products'>
            <h2 className='title'>Products
                <span className='addButton'>
                    <Link to={'/seller/'+props.shopId+'/products/new'}>
                        <Button color='primary' variant='contained'>
                            <i className='fa fa-add-box leftIcon'></i>
                        </Button>
                    </Link>
                </span>
            </h2>
            <div>
                {products.map((product, i) => {
                    return( 
                    <span key={i}>
                        <div>
                            <div className='cover'>
                                <img src={'/api/product/image/'+product._id+'?'+new Date().getTime()}  alt={product.name} />
                                <h2>{product.name}</h2>
                            </div>
                            <div className='details'>
                                <h3 className='productTitle'>
                                    {product.name}
                                </h3>
                                <p>
                                    Quantity: {product.quantity} | Price: ${product.price}
                                </p>
                            </div>
                            <div>
                                <Link to={'/seller/'+product.shop._id+'/'+product._id+'/edit'}>
                                    <i className='fa fa-edit '></i>
                                </Link>
                                <DeleteProduct product={product} shopId={props.shopId} onRemove={removeProduct} />
                            </div>
                        </div>
                    </span>)
                })}
            </div>
        </div>
    )
}
Products.propTypes = {
    shopId: PropTypes.string.isRequired
}