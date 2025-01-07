"use client";

import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const SocialLinks = () => {
    const socialButtonData = [
        { platform: 'facebook', icon: <FaFacebookF />, color: 'bg-[#3b5999]', hoverColor: 'bg-[#2d4373]' },
        { platform: 'instagram', icon: <FaInstagram />, color: 'bg-[#c13584]', hoverColor: 'bg-[#a9336d]' },
        { platform: 'tiktok', icon: <FaTiktok />, color: 'bg-[#4AE1ED]', hoverColor: 'bg-[#563d7c]' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5, duration: 0.5 }}
            className="social-links-container absolute top-[10%] transform -translate-y-1/2 right-0 flex flex-col flex-wrap justify-center gap-2 pr-[24px]"
        >
            {socialButtonData.map(({ platform, icon, color, hoverColor }) => (
                <button
                    key={platform}
                    className={`w-[2rem] relative flex justify-center items-center h-[2rem]  rounded-full ${color} transition-all duration-200 overflow-hidden hover:text-white hover:shadow-2xl hover:${hoverColor} hover:before:absolute hover:before:left-0 hover:before:-ml-2 hover:before:h-48 hover:before:w-48 hover:before:origin-top-right hover:before:-translate-x-full hover:before:translate-y-12 hover:before:-rotate-90 hover:before:bg-gray-900 hover:before:transition-all hover:before:duration-300 hover:animate-spin`}
                    aria-label={platform}
                    style={{ transformOrigin: 'center' }}
                >
                    <span className="relative z-10 text-white">{icon}</span>
                    <span className="absolute inset-0 bg-gray-900 opacity-0 transition-opacity duration-300"></span>
                </button>
            ))}
        </motion.div>
    );
}

export default SocialLinks;
