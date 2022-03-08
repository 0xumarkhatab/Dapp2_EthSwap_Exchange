import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./buyForm.css";
import TradingChoices from "./TradingChoices";
import { purchaseTokens } from "./Web3Client";

function BuyForm({choiceUpdator}) {
const dispatch=useDispatch();
const selector=useSelector((state)=>state);
console.log("state in BuyForm",selector);

const [ethAmount,setEthAmount] =useState(0.0);
const [utokenAmount,setUTokenAmount] =useState(0.0);

function handleBuyTokens(){
    document.getElementById('ethereumInput').value='';    
    document.getElementById('uTokenInput').value='';
    console.log("Buying Tokens Now.....")
    console.log("calling purchase with ",selector)
    purchaseTokens(utokenAmount,selector);
    

}

async function EthAmountChangeHandler(e){
    await setEthAmount(e.target.value)
    let divisor=1000;
    await setUTokenAmount(e.target.value*divisor);
    document.getElementById('uTokenInput').value=(e.target.value)*1000;
    
}


  return (
    <div className="buyForm">
        <TradingChoices choiceUpdator={choiceUpdator}/>
      <div className="inputGroup">
        <label htmlFor="ethereumInput" />
        <input
          id="ethereumInput"
          type="number"
          placeholder="Enter Ethereum Tokens to Trade"
          autoComplete="off"
          onChange={async (e)=>{
              EthAmountChangeHandler(e);

          }}
        />
        <img src="./eth.png" />
      </div>
      <div className="inputGroup">
        <label htmlFor="uTokenInput" />
        <input
          disabled
          id="uTokenInput"
          type="number"
          placeholder="0 UTokens"

        />
        <img src="./u.png" />
      </div>
      <div className="btn-buy">
        <button
          onClick={() => {
            console.log("Buy Tokens");
            handleBuyTokens();

          }}
        >
          Buy U Tokens
        </button>
      </div>
    </div>
  );
}

export default BuyForm;
