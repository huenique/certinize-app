import "./Header.css";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ title }) => {
  return <h1 className="header">{title}</h1>;
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
<<<<<<< HEAD
};
=======
};
>>>>>>> 9e78c5c636aceaa98cbf8d0ed5667d339e86906f
