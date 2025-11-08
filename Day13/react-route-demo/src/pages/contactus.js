// src/pages/contactus.jsx
import React from "react";

import { Link } from "react-router-dom";

export default function Contactus() {
  return (
    <div>
      <h2>Contact Us</h2>
      <p>Welcome! We are here to help you </p>
      <Link to="/user/7">Go to user 7</Link>
    </div>
  );
}

