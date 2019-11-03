import React from "react";

const MonPremierCannasson = props => {
  const handleClick = () => {
    props.CallBack();
  };

  return (
    <div>
      <div className="bg-primary">
        <h2 className="mx-center">
          Vous n'avez pas encore de Cannasson de course
        </h2>
        <button className="btn-lg my-2" onClick={handleClick}>
          Obtenir mon premier Cannasson
        </button>
      </div>
    </div>
  );
};

export default MonPremierCannasson;
