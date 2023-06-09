import { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import Logo from '@assets/Euphorix_logo.svg'
import ConfirmLogOut from '../ConfirmLogOut'
const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const [confirmLogOut, setConfirmLogOut] = useState()
  const toggleConfirmLogOut =()=>{
    if(confirmLogOut){
      setConfirmLogOut(!confirmLogOut)
      return
    }
    else{
      setConfirmLogOut(true)
      return
    }
  }
  const activeStyle = 'underline underline-offset-4'
  const navigate =useNavigate()
  const userEmail = JSON.parse(localStorage.getItem('currentUser'))?.email
  const handleLogIn=()=>{
    context.setIsLogIn(false)
    const stringifiedLogIn = JSON.stringify(false)
    localStorage.setItem('isLogIn', stringifiedLogIn)
    let currentPaht = location.pathname
    const onSuccessOfSignIn =()=>{
      navigate(currentPaht)
    }
    context.setOnSuccess(() => onSuccessOfSignIn)
  }
  return (
    <header className={`grid grid-flow-col grid-cols-1fr-7fr  fixed z-10 top-0 w-full pb-2  bg-white border-b border-black`}>
      <Link to='/' className=' self-center'>
        <img src={Logo} alt="logo Euphorix"  className=' w-[10rem] h-[33px] object-cover '/>
      </Link>
      <div className='flex flex-col '>
      <nav className='flex justify-between items-center  top-0 w-full pt-3 pr-8 text-sm font-light'>
        <ul className='flex items-center gap-3'>
          <li>
            <NavLink
              to='/'
              onClick={() => context.setSearchByCategory()}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/shoes'
              onClick={() => context.setSearchByCategory('shoes')}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/electronics'
              onClick={() => context.setSearchByCategory('electronics')}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Electronics
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/furnitures'
              onClick={() => context.setSearchByCategory('furniture')}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Furnitures
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/toys'
              onClick={() => context.setSearchByCategory('toys')}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Toys
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/others'
              onClick={() => context.setSearchByCategory('others')}
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Others
            </NavLink>
          </li>
        </ul>
        {context.isUserLogIn? <ul className='flex items-center gap-3'>
          <li className='text-black/60'>
            {userEmail}
          </li>
          <li>
            <NavLink
              to='/my-orders'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Account
            </NavLink>
          </li>
          <li onClick={()=>{toggleConfirmLogOut()}}  className='cursor-pointer'>
            Sign out
          </li>
          <li className='flex items-center cursor-pointer' onClick={()=>{context.toggleCheckoutSideMenu()}}>
            <ShoppingBagIcon className='h-6 w-6 text-black'></ShoppingBagIcon>
            <div className=' relative top-[-10px] right-1 bg-[#FF0202] rounded-full w-4 h-4 flex justify-center items-center font-bold text-white'>{context.cartProducts.length}</div>
          </li>
        </ul>
        :<ul>
            <li>
              <NavLink
                to='/sign-in'
                className={({ isActive }) =>
                  isActive ? 'hidden' : ' absolute top-5 right-4 bg-black rounded-lg text-white px-2 py-1 font-bold'
                }
                onClick={()=>handleLogIn()}>
                Sign In
              </NavLink>
            </li>
          </ul>}
      </nav>
       <input
        type="text"
        placeholder='Search a product'
        className='rounded-full  w-[40%] mt-2 pl-2 border border-black/50    focus:outline-none relative left-64 shadow-lg'
        onChange={(event) => context.setSearchByTitle(event.target.value)} />
        {confirmLogOut && <ConfirmLogOut cancel = {toggleConfirmLogOut}/> }
      </div>
      
    </header>
    
  )
}

export default Navbar