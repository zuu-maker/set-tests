import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Sirius Educational Trust</h3>
          <p className="text-justify">
            Sirius Smart Schools is a digital learning platform developed by
            Sirius Educational Trust. Whether preparing for the School
            Certificate, GCE, or internal assessments, our platform empowers
            learners, teachers and schools across Zambia with innovation that
            drive better learning outcomes.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              f
            </a>
            <a href="#" className="social-link">
              ♪
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Policies</h3>
          <ul className="footer-links">
            <li>
              <Link href="/refund">Refund Policy</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2024 Sirius Educational Trust. All rights reserved. Made with
          💙 for Zambian students.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
