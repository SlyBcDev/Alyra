import React from "react";

function NoWallet() {
  return (
    <div>
      <h4>Ce jeu nécessite l'installation de Metamask </h4>
      <h4>et d'être connecté à un wallet </h4>
      <a
        src="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        href="Metamask"
      >
        Obtenir Metamask
      </a>
    </div>
  );
}

export default NoWallet;
