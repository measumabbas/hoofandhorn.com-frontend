import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="buttons-spinner">
      <Oval
        visible={true}
        height="23"
        width="23"
        color="#ffff"
        ariaLabel="oval-loading"
        border="2"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinner;
