import React from "react";

function Header({ address }) {
  return (
    <div>
      <h1>Cannasson's Run</h1>
      <h4>Votre adresse est : {address}</h4>
    </div>
  );
}

export default Header;
