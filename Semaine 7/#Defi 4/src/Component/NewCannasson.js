import React from "react";

const NewCannasson = props => {
  const handleClick = () => {
    props.CallBack();
  };

  return (
    <div>
      <div className="m-3 bg-primary">
        <h2 className="mx-center">
          Souhaitez vous un nouveau Cannasson pour 1 Finney ?
        </h2>
        <button className="btn-lg my-2" onClick={handleClick}>
          Obtenir un Cannasson
        </button>
      </div>
    </div>
  );
};

export default NewCannasson;
