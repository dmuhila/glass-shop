import React, { Component } from "react";

const Footer = props => {
  return (
    <footer>
      <p className="footer-links">
        <a
          href="https://github.com/dmuhila"
          target="_blank"
        >
        <i class="fab fa-github-square fa-3x" color="black"></i>
        </a>
      </p>
      <p>
        &copy; 2019 <strong>Glass</strong>
      </p>
    </footer>
  );
};

export default Footer;
