import React,{useState} from 'react'
import './navbar.css';
import { Button } from "react-bootstrap";
import { useSelector } from 'react-redux';

let  state=undefined;
function Navbar() {
  state=useSelector((state)=>state)
const [reloader,setReloader]=useState(false)
  while( state===undefined){
  setReloader((prev)=>!prev);
  }
  
  console.log("state in navabar",state)
   const oneEth=1000000000000000000;
  let tokens,eth,adress;
  if(state.user_token_balance!==undefined){
    tokens=state?.user_token_balance?.toString();
  
  }else{
    tokens="0"
    console.log("No UTokens");

  }

  eth=(state?.user_ethereum_balance/oneEth);
  eth=eth?.toString().slice(0,5) 
  adress= `${state?.current_user_address?.toString().slice(0,6)}..`


  return (
    <div className='navbar'>
      <div className='navbar__left'
      >
        <a href="#"><img src="./eth_swap.png"/></a>
        <p>Trade Ethereum for U Tokens</p>
      </div>
      <div className='navbar__right'>
          <Button outline="true" variant="success">{tokens} <img src="./u.png" /> </Button>
          <Button outline="true" variant="info">{eth} <img src="./eth.png" /></Button>
          <Button outline="true" variant="danger">{adress}</Button>
          
      </div>
    </div>
  )
}

export default Navbar
