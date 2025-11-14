import React from "react";
import { motion } from "framer-motion";

import img1 from "../../../assets/brands/1.jpg";
import img2 from "../../../assets/brands/2.png";
import img3 from "../../../assets/brands/3.jpg";
import img4 from "../../../assets/brands/4.jpg";
import img5 from "../../../assets/brands/5.png";
import img6 from "../../../assets/brands/6.png";
import img7 from "../../../assets/brands/7.jpg";
import img8 from "../../../assets/brands/8.jpg";


const logos = [img1, img2, img3, img4, img5, img6,img7,img8];


const ClientSlider = () => {
  return (
    <div className="py-10 bg-green-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Trusted by Amazing Clients
      </h2>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-10"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
        >
          {/* First loop of logos */}
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition"
            />
          ))}

          {/* Duplicate loop for smooth infinite scroll */}
          {logos.map((logo, index) => (
            <img
              key={`dup-${index}`}
              src={logo}
              className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientSlider;
