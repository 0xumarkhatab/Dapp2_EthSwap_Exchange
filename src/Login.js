import React from 'react';
import './Login.css';

import { Button } from 'react-bootstrap';

import Typical from 'react-typical';


function Login(props) {

function handleClick(){
    props.onClick(props?.args?.dispatch);
}

    return (
    <div className='login'>
      <div className="login__top">
        <a href="#"><img src="./eth_swap.png"/></a>
<div>
<Typical
        steps={['EthSwap', 1000, 'Trade Ethereum for U Tokens', 500]}
        loop={Infinity}
        wrapper="p"
      />
    
</div>
    
      </div>
      <div className='login__bottom'>
    <Button onClick={handleClick} >Login With Meta Mask</Button>

        </div>

    </div>

  )

}

export default Login
