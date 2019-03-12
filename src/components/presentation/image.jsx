import React, { Component } from "react";

const Image = (props) => {
  const { image } = props;
  return (
    <img className="image" src={image}/>
  )
}

export default Image