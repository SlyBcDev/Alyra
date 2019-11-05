import React from "react";

const Compteur = ({ nombre, date }) => {
  let now = Math.round(new Date().getTime() / 1000);
  let delai = date - now;
  let heure = Math.floor((delai % 86400) / 3600);
  let min = Math.floor(((delai % 86400) % 3600) / 60);
  let stringDate;
  if (heure <= 0 && min <= 0) {
    stringDate = "Now";
  } else {
    stringDate = `${heure}H ${min}min `;
  }

  return (
    <div>
      {nombre > 0 ? (
        <div className="alert alert-secondary">
          <h6> Vous avez {nombre} </h6>
          <h6>course(s) gratuite(s)</h6>
        </div>
      ) : stringDate !== "Now" ? (
        <div className="alert alert-secondary">
          <h6>Prochaine course gratuite</h6>
          <h6>dans {stringDate}</h6>
        </div>
      ) : (
        <div className="alert alert-secondary">
          <h6> Vous avez 1 </h6>
          <h6>course gratuite</h6>
        </div>
      )}
    </div>
  );
};

export default Compteur;
