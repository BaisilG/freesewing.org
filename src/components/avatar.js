import React from "react";

const Avatar = props => {
  const style = {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
  }
  if (props.data && typeof props.data.pictureUris !== "undefined")
    return <img src={props.data.pictureUris.m} style={style} className="shadow" alt="🙂"/>
  else return <img src="/avatar.svg" style={style} className="shadow" alt="🙂"/>
}

export default Avatar;
