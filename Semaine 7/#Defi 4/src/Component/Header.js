import React from "react";
import NoWallet from "./NoWallet";

function Header({ address }) {
  return (
    <div>
      <h1>Cannasson's Run</h1>
      {address ? <h4>Votre adresse est : {address} </h4> : <NoWallet />}
    </div>
  );
}

export default Header;
