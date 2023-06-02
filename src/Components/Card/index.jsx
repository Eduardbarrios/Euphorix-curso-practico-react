import { useContext } from 'react'
import {  useNavigate } from "react-router-dom";
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Card = (data) => {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate();
  let currentLocation
  let producttoAdd
  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)
  }
  const onSuccessOfAdd = function(){
      navigate(currentLocation)
      context.setCount(context.count + 1)
      context.setCartProducts([...context.cartProducts, producttoAdd])
      context.openCheckoutSideMenu()
      context.closeProductDetail()
  }
  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.openCheckoutSideMenu()
    context.closeProductDetail()
  }
  const handleClickToAdd = (event, productData)=>{
    if(context.isUserLogIn){
     addProductsToCart(event, productData)
    }
    else{
      localStorage.setItem('productToAdd', JSON.stringify(productData))
      producttoAdd = JSON.parse(localStorage.getItem('productToAdd'))
      event.stopPropagation()
      currentLocation = location.pathname
      navigate('/sign-in')
      context.setOnSuccess(()=> onSuccessOfAdd)
    }
  }
  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'>
          <CheckIcon className='h-6 w-6 text-white'></CheckIcon>
        </div>
      )
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => handleClickToAdd(event, data.data)}>
          <PlusIcon className='h-6 w-6 text-black'></PlusIcon>
        </div>
      )
    }
  }

  return (
    <div
      className='bg-white cursor-pointer w-56 h-60 rounded-lg border border-black/30 shadow-xl'
      onClick={() => showProduct(data.data)}>
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category.name}</span>
        <img className='w-full h-full object-cover rounded-lg' src={data.data.images[0]} alt={data.data.title} />
        {renderIcon(data.data.id)}
      </figure>
      <p className='flex justify-between px-3'>
        <span className='text-sm font-medium'>{data.data.title}</span>
        <span className='text-lg font-bold'>${data.data.price}</span>
      </p>
    </div>
  )
}

export default Card