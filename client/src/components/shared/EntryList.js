import React from "react";
import { Link } from "react-router-dom";
import Icons from "./Icons";

export default function EntryList(props) {
  return (
    <div className="flex flex-column ba pa2 br4 ma1 light-blue">
      {props.title && (
        <h2 className="tl pl3 mb0 mt2 bb b--moon-gray gray">{props.title}</h2>
      )}
      <ul className="list pa0 mv1">
        {props.entries.map((entry) => {
          return (
            <li className="flex bb b--moon-gray">
              <Link
                className="link inline-flex items-center ma2 ml3 tc br2 gray dim"
                to={`/add/${entry}`}
              >
                <div className="ba br-100 pa2">
                  <Icons icon={entry} />
                </div>
                <span className="f6 ml3 pr2">{entry}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
