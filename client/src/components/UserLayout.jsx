import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div style={{ padding: "0px 120px" }}>
      <Outlet />
    </div>
  );
};

export default UserLayout;
