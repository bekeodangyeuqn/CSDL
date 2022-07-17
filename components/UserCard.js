import styles from "../styles/UserCard.module.css";

import React from "react";
import Link from "next/link";

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <img src={user.img_url} alt="Avatar" style={{ width: "100%" }} />
      <div className={styles.container}>
        <h4>
          <b>
            {user.first_name} {user.last_name}
          </b>
        </h4>
        <p>{user.address}</p>
        <Link href={`/user/${user.user_id}`}>
          <a className="button">Details</a>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
