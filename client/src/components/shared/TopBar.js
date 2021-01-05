import React from "react";
import Icons from "./Icons";

export default function TopBar(props) {
  return (
    <div className="flex justify-center align-center w-100 bg-blue shadow-1">
      <div className="ba br-100 pa2 inline-flex items-center mv2 white">
        <Icons icon={props.icon} />
      </div>
      <span className="self-center f4 ml3 white b">{props.title}</span>
    </div>
  );
}
