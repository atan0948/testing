import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  background: "#343a40",
  color: "#fff",
  padding: "10px 20px",
  boxSizing: "border-box",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const profileContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "0 20px",
};

function Header() {
  return (
    <div style={headerContainerStyle}>
      <div style={logoStyle}>YourAppLogo</div>
      <div style={profileContainerStyle}>
        <span>User Name</span> {/* Placeholder for the username */}
        <div>
          <FaRegUserCircle style={{ fontSize: "35px" }} />
          {/* Profile icon */}
        </div>
      </div>
    </div>
  );
}

export default Header;
