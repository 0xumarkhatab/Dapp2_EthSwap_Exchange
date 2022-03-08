import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';

function TradingChoices({choiceUpdator}) {
  const [currentMode,setCurrentMode]=useState('buy');

    return (
    <div
    style={{
        display:"flex",
        justifyContent:"space-between",
        marginBottom:"20px",
    }}
    className="tradingChoices">
      <Button
        onClick={() => {
          console.log("Want to Buy");
          choiceUpdator('buy')
          setCurrentMode('buy');

        }}
        variant="success"
        className="outlinedButton"
      >
        Buy
      </Button>
      <h2 id="mode"
      className="tradeChoiceHeading"
      style={{
          textDecoration:"underline",
          transition:"all 300ms ease-in-out"
      }}
      >
          Trade Freely!
      </h2>
      <Button
        onClick={async () => {
        console.log("Want to sell");
        choiceUpdator('sell')
        
        }}
        variant="danger"
        
      >
        Sell
      </Button>
    </div>
  );
}

export default TradingChoices;
