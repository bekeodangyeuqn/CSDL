import React from "react";
import Link from "next/link";
const Error = () => {
  return (
    <div className="container">
      <h1>Opps...!</h1>
      <p>404 page for not found</p>
      <Link href={"/"}>
        <a className="button">Go to home</a>
      </Link>
    </div>
  );
};

export default Error;
