import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrumb } from "../hook/useBreadcrumb";
const Breadcrumb = ({ product, variant ,category }) => {
  const items = useBreadcrumb({ product, variant ,category});
    console.log("items",items);
  return (
    <ul className="breadcrumb">
      {items.map((item, index) => (
        <li key={index} className={index === items.length - 1 ? "" : "home"}>
          {index === items.length - 1 ? (
            <strong>
              <span>{item.name}</span>
            </strong>
          ) : (
            <>
              <Link to={item.link} className="changeurl">{item.name}</Link>
              <i className="fa-solid fa-chevron-right"></i>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
