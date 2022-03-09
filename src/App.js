import './App.css';
import BuyForm from './BuyForm';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import TradingChoices from './TradingChoices';
import { useEffect, useState } from 'react';
import SellForm from './SellForm';
import ethSwap from "contracts/ethswap.json";
import {instantiateApp,purchaseTokens,balance,refund} from "./Web3Client.js"
import { useDispatch, useSelector } from 'react-redux';
import PurchaseHistory from './PurchaseHistory';
import "./dist/loader/css/react-spinner-loader.css";
import Loader from './Loader';
import Login from './Login';

 function App() {

const [mode , setMode]=useState('buy');
const dispatch=useDispatch();
const selector=useSelector((state)=>state);
const [userLoggedIn,setUserLoggedIn]=useState(false);

// useEffect(()=>{
 
//   },[])
  
let state=useSelector((state)=>{return  state});

console.log("state in app.js ",state)

  return (
    <>
    {state.current_user_address===undefined && <Login onClick={instantiateApp} args={{dispatch:dispatch}}/>}
    {state.current_user_address && <div className="app">
      <Navbar/>
      <div className='main'>
    {
      mode ==='buy'? <BuyForm choiceUpdator={setMode} /> : <SellForm selector={state} choiceUpdator={setMode}/>
    }
         
         <Loader title="initiated"/>

      </div>
 
    </div>
    }
    </>

  );
}

export default App;
