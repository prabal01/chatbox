import React from 'react';
import "./stylesheet/style.css"
export default function InputComponent(props) {
  return (
    <div className="input_field_main_div" onChange={(e)=>{
      props.TypedMessageChangeHandler(e)}
    }>
        <input type="text"/>
      <button onClick={()=>props.SendMessage(props.TypedMes)}>Send</button>
    </div>
  );
}
