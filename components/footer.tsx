import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FoodStreet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;