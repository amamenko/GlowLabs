import React, { useState, useEffect } from "react";

const ClientProfile = () => {
  const [user, changeUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/graphql").then(res =>
      res.json().then(json => {
        changeUser(json);
      })
    );
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        diplay: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      HERE IS THE CLIENT PROFILE WOW
    </div>
  );
};

export default ClientProfile;
