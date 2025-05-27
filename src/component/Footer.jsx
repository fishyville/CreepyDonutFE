import React from 'react';
import { Copyright, Facebook, InstagramIcon, MessageSquare, Video, Mail, MapPin, Phone } from 'lucide-react';
import { href, Link } from 'react-router-dom';

export default function Footer() {
  const socialLinks = [
    { icon: <InstagramIcon className="w-5 h-5 text-[#f2d9b1]" />, label: "Instagram" },
    { icon: <MessageSquare className="w-5 h-5 text-[#f2d9b1]" />, label: "Discord" },
    { icon: <Video className="w-5 h-5 text-[#f2d9b1]" />, label: "TikTok" },
    { icon: <Facebook className="w-5 h-5 text-[#f2d9b1]" />, label: "Facebook" },
  ];

  const helpLinks = [
    { label: "FAQ", href: "#" },
    { label: "Our Service", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Order Status", href: "/orders" },
  ];
  const storeLinks = [
    { label: "Store Events", href: "/" },
    { label: "Store Hours", href: "/" },
    { label: "Creepy Store Supports", href: "#" }, // kalau belum ada halaman
    { label: "Seasonal Specials", href: "/" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "creepydonut@gmail.com" },
    { icon: <Phone className="w-4 h-4" />, text: "+62 81 1776 1151" },
    { 
      icon: <MapPin className="w-4 h-4" />, 
      text: "Aditana Residence, Kota Tangerang",
      link: "https://maps.app.goo.gl/XC1RGcd3Jz29gRQA7"
    },
  ];

  return (
    <div className="w-full bg-[#f2d9b1] overflow-hidden">
      {/* Diagonal Stripe Bar */}
      <div
        className="w-full h-3"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #4a2b1b 0 12px, #eb7c7b 12px 24px)'
        }}
      ></div>
      {/* Main Footer Content */}
      <div className="px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-[#4a2b1b] mb-3">CreepyDonut</h2>
            <div className="w-16 h-1 bg-[#4a2b1b] mb-4"></div>
            <p className="text-sm text-black">The donut that stares back.</p>
          </div>

          {/* Get Help Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-[#4a2b1b] mb-3">Get Help</h3>
            <div className="w-16 h-1 bg-[#4a2b1b] mb-4"></div>
<ul className="space-y-3">
  {helpLinks.map((link, index) => (
    <li key={index}>
      <Link
        to={link.href}
        className="text-sm text-[#060606] hover:text-[#EB7C7B] hover:underline transition-colors"
      >
        {link.label}
      </Link>
    </li>
  ))}
</ul>

          </div>

          {/* Creepy Store Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-[#4a2b1b] mb-3">Creepy Store</h3>
            <div className="w-16 h-1 bg-[#4a2b1b] mb-4"></div>
            <ul className="space-y-3">
              {storeLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-[#060606] hover:text-[#EB7C7B] hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-[#4a2b1b] mb-3">Contact Us</h3>
            <div className="w-16 h-1 bg-[#4a2b1b] mb-4"></div>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-[#060606]">{item.icon}</span>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#060606] hover:text-[#EB7C7B] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm text-[#060606]">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-[#4a2b1b] mb-3">Follow Us</h3>
            <div className="w-16 h-1 bg-[#4a2b1b] mb-4"></div>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="https://www.instagram.com/sussus_jo/"
                  className="w-8 h-8 bg-[#4a2b1b] rounded-full flex items-center justify-center hover:bg-[#EB7C7B] transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-[#4a2b1b] px-12 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold text-[#f2d9b1] mb-4 md:mb-0">
            THE DONUTS
          </div>
          
          <div className="flex items-center space-x-2 text-[#f2d9b1]">
            <Copyright className="w-4 h-4" />
            <span className="text-base">2024 CreepyDonut — Sugar & nightmares included</span>
          </div>
        </div>
      </div>
    </div>
  );
}