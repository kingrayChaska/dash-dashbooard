import React from "react";
// import Link from "next/link";
// import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-gray-200 p-2 text-center">
      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-center">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} Admin Dashboard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
