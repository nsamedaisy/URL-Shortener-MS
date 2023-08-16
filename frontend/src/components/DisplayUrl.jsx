import React from "react";

function DisplayUrl() {
  const getData = JSON.parse(localStorage.getItem("url-Item"));
  console.log(getData);

  return <div>{JSON.stringify(getData)}</div>;
}

export default DisplayUrl;
