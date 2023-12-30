import React from "react";
import Image from "next/image";

// ... add logs for other variables

function Footer({ children }) {
  return (
    <footer className="bg-gray-900 text-gray-500 py-8 flex-shrink-0">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center h-full">
        <div className="text-sm">&copy; Nextjs e-commerce project.</div>
        <div className="text-sm">
          {" "}
          <a target="_blank" rel="noopener noreferrer" href="#">
            Amir Ibraimov
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center">
          <Image
            src="/assets/visa.png" // Replace with the actual image source
            alt="Payment Options"
            className="w-24 h-auto md:w-24 md:h-auto mx-auto"
            height={200}
            width={200}
          />
          <Image
            src="/assets/mc.png" // Replace with the actual image source
            alt="Payment Options"
            className="w-24 h-auto md:w-24 md:h-auto mx-auto"
            height={200}
            width={200}
          />
        </div>

        <div className="text-sm">
          {" "}
          <a target="_blank" rel="noopener noreferrer" href="#">
            {" "}
            Public Agreement{" "}
          </a>
        </div>
        <div className="text-sm">All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
