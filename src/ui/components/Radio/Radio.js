import React from "react";

import $ from "./Radio.module.css";

const Radio = ({ id, name, onChange,children }) => {
  return (
    <div className={$.radio}>
      <input type="radio" id={id} name={name} onChange={onChange} value={id} />
      <label for={id}>{children}</label>
    </div>
  );
};

export default Radio;
