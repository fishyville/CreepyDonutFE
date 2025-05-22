import { Separator } from "@/components/ui/separator";
import { Copyright, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function FooterSection() {
  // Data for footer sections to enable mapping
  const getHelpLinks = [
    { title: "FAQ", href: "#" },
    { title: "Our Service", href: "#" },
    { title: "About Us", href: "#" },
    { title: "Order Status", href: "#" },
  ];

  const creepyStoreLinks = [
    { title: "Store Events", href: "#" },
    { title: "Store Hours", href: "#" },
    { title: "Creepy Store Supports", href: "#" },
    { title: "Seasonal Specials", href: "#" },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-4.5 h-3.5" />,
      text: "creepydonut@gmail.com",
      href: "mailto:creepydonut@gmail.com",
    },
    {
      icon: <Phone className="w-4 h-[15px]" />,
      text: "+62 81 1776 1151",
      href: "tel:+6281177611511",
    },
    {
      icon: <MapPin className="w-3.5 h-[18px]" />,
      text: "Aditana Residence, Kota Tangerang",
      href: "https://maps.app.goo.gl/XC1RGcd3Jz29gRQA7",
    },
  ];

  const socialLinks = [
    { name: "Instagram", href: "#", icon: "instagram-1.png" },
    { name: "Discord", href: "#", icon: "discord-1-1.png" },
    { name: "TikTok", href: "#", icon: "tik-tok-1-1.png" },
    { name: "Facebook", href: "#", icon: "facebook-app-symbol-1.png" },
  ];

  return (
    <footer className="w-full bg-[#f2d9b1] rounded-[var(--shape-corner-medium)]">
      <div className="relative w-full">
        {/* Main footer content */}
        <div className="flex flex-wrap px-12 py-16 gap-x-16">
          {/* Brand section */}
          <div className="flex flex-col space-y-4 w-[183px]">
            <h3 className="font-bold text-2xl text-[#4a2b1b] font-['Kantumruy-Bold',Helvetica]">
              CreepyDonut
            </h3>
            <Separator className="w-[70px] h-[3px] bg-[#4a2b1b]" />
            <p className="text-sm text-black font-['Kantumruy-Regular',Helvetica]">
              The donut that stares back.
            </p>
          </div>

          {/* Get Help section */}
          <div className="flex flex-col space-y-4 w-[106px]">
            <h3 className="font-bold text-2xl text-[#4a2b1b] font-['Kantumruy-Bold',Helvetica]">
              Get Help
            </h3>
            <Separator className="w-[70px] h-[3px] bg-[#4a2b1b]" />
            <nav className="flex flex-col space-y-3">
              {getHelpLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-[#060606] font-['Kantumruy-Regular',Helvetica]"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Creepy Store section */}
          <div className="flex flex-col space-y-4 w-[154px]">
            <h3 className="font-bold text-2xl text-[#4a2b1b] font-['Kantumruy-Bold',Helvetica]">
              Creepy Store
            </h3>
            <Separator className="w-[70px] h-[3px] bg-[#4a2b1b]" />
            <nav className="flex flex-col space-y-3">
              {creepyStoreLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-[#060606] font-['Kantumruy-Regular',Helvetica]"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Us section */}
          <div className="flex flex-col space-y-4 w-[132px]">
            <h3 className="font-bold text-2xl text-[#4a2b1b] font-['Kantumruy-Bold',Helvetica]">
              Contact Us
            </h3>
            <Separator className="w-[70px] h-[3px] bg-[#4a2b1b]" />
            <div className="flex flex-col space-y-3">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-2"
                  rel={
                    item.href.startsWith("https")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  target={item.href.startsWith("https") ? "_blank" : undefined}
                >
                  <span className="mt-1 text-[#060606]">{item.icon}</span>
                  <span className="text-sm text-[#060606] font-['Kantumruy-Regular',Helvetica]">
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Follow Us section */}
          <div className="flex flex-col space-y-4 w-[116px]">
            <h3 className="font-bold text-2xl text-[#4a2b1b] font-['Kantumruy-Bold',Helvetica]">
              Follow Us
            </h3>
            <Separator className="w-[70px] h-[3px] bg-[#4a2b1b]" />
            <div className="flex space-x-3 mt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-[30px] h-[30px] bg-[#4a2b1b] rounded-[15px]"
                  aria-label={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5 object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="w-full h-[90px] bg-[#813939]">
          <div className="flex items-center justify-between h-full px-10">
            <div className="font-bold text-xl text-[#f2d9b1] font-['Montserrat-Bold',Helvetica]">
              THE DONUTS
            </div>
            <div className="flex items-center text-[#f2d9b1] font-['Kantumruy-Regular',Helvetica] text-base">
              <Copyright className="w-3.5 h-3.5 mr-1" />
              <span>2024 CreepyDonut — Sugar &amp; nightmares included</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
