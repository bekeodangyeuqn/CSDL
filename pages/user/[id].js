import React from "react";
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();
  const paths = data.map((user) => {
    return {
      params: { id: user.user_id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:3000/api/user/" + id);
  const data = await res.json();
  return {
    props: { user: data },
  };
};
const Detail = ({ user }) => {
  return (
    <div className="container">
      <img
        src={user[0].img_url}
        alt="Avatar"
        style={{ width: "200px", height: "200px" }}
      />
      <h1>
        {user[0].first_name} {user[0].last_name}
      </h1>
      <h2>{user[0].address}</h2>
      <h3>{user[0].gender}</h3>
      <h3>{user[0].dob}</h3>
    </div>
  );
};

export default Detail;
