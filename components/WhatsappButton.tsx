"use client";

import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "2348012345678"; // 👈 replace with your number (no +, no spaces)

export const WhatsAppButton = () => {
  const message = encodeURIComponent("Hi, I need support");
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};