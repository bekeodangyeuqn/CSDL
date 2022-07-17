import React from "react";
import UserCard from "../../components/UserCard";
import styles from "../../styles/User.module.css";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();
  console.log(res);
  return {
    props: { users: data },
  };
};

function User({ users }) {
  return (
    <div className="container">
      <div className={styles.userlist}>
        {users.map((user) => {
          return <UserCard key={user.user_id} user={user} />;
        })}
      </div>
    </div>
  );
}

export default User;
