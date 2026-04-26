import React from 'react';

const Footer = ({ name }) => {
  return (
    <footer className="relative z-50 bg-[#F0F9FF] py-8 pb-12 md:pb-8 text-center text-[#334155] text-sm">
      <p>© {new Date().getFullYear()} {name}.</p>
    </footer>
  );
};

export default Footer;
