import React, { Component } from "react";
import Image from "./image.jsx";
import Moment from "react-moment";

const Post= (props) => {
  const { data } = props;
  const dateToFormat = data.timestamp;
  let image = null;
  if (data.image) {
    image = <Image image={data.image}/>
  }
  return (
    
    <div className="post">
      <div className="header"><span class="subreddit">{data.subreddit}</span><span class="author"> . Posted by {data.author} at <Moment format="LLL" date={dateToFormat}></Moment></span></div>
      <div className="title"><a href={data.postUrl} target="_blank">{data.title}</a></div>
      {image}
      <div className="comments"><a href={data.comments} target="_blank">Comments</a></div>
    </div>
  )
}

export default Post