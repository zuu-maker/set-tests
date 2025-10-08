import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Sirius Educational Trust</h3>
          <p>
            Assisting Zambian students with exam preparation and quality
            education resources.
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
