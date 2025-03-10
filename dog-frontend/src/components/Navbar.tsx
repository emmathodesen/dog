import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/dogs" style={styles.navLink}>Dog List</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/create-dog" style={styles.navLink}>Add Dog</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Login</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/register" style={styles.navLink}>Register</Link> {/* New element */}
        </li>
      </ul>
    </nav>
  );
};


const styles = {
  navList: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: "10px 0",
    backgroundColor: "#f1f1f1",
    justifyContent: "space-around",
  },
  navItem: {
    margin: "0 10px",
  },
  navLink: {
    textDecoration: "none",
    color: "#007BFF",
    fontSize: "16px",
  },
};

export default Navbar;
