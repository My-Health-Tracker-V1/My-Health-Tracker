import React from "react";
import { Link } from "react-router-dom";
import Icons from "./Icons";

export default function BottomNavbar() {
  return (
    <nav className="ba blue pv2 w-100 bottom-0 bg-white fixed">
      <Link to="/dashboard" className="link blue hover-silver dib mh2 tc">
        <Icons icon="diary" />
        <span className="f6 db">Diary</span>
      </Link>

      <Link to="/analysis" className="link blue hover-silver dib mh2 tc">
        <Icons icon="analysis" />
        <span className="f6 db">Analysis</span>
      </Link>

      <Link to="/add-item" className="link blue hover-silver dib mh2 tc">
        <Icons icon="add" />
        <span className="f6 db">add</span>
      </Link>

      <Link to="/add-recipes" className="link blue hover-silver dib mh3 tc">
        <Icons icon="recipes" />
        <span className="f6 db">Recipes</span>
      </Link>

      <Link to="/settings" className="link blue hover-silver dib mh2 tc">
        <Icons icon="settings" />
        <span className="f6 db">Settings</span>
      </Link>
    </nav>
  );
}
