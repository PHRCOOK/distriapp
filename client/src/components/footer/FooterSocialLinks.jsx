import React from "react";

const FooterSocialLinks = () => (
  <ul className="list-inline">
    <li className="list-inline-item">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none text-white"
      >
        <i className="fab fa-facebook-f me-2"></i>
        Facebook
      </a>
    </li>
    <li className="list-inline-item mx-3">|</li>
    <li className="list-inline-item">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none text-white"
      >
        <i className="fab fa-twitter me-2"></i>
        Twitter
      </a>
    </li>
    <li className="list-inline-item mx-3">|</li>
    <li className="list-inline-item">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none text-white"
      >
        <i className="fab fa-instagram me-2"></i>
        Instagram
      </a>
    </li>
  </ul>
);

export default FooterSocialLinks;
