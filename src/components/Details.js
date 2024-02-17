import React from "react";

function Details({ info }) {
  return (
    <div className="bg-gray-30 absolute -top-5 w-[140%] opacity-80 text-center right-0 rounded-sm p-1 text-xs z-20 invisible group-hover/item:visible">
      <small>{info}</small>
    </div>
  );
}

export default Details;
