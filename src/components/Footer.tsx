import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/assets/svg/HubsAI_Logo.svg" 
                alt="HubsAI" 
                className="h-8"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionizing retail through tokenization and AI. 
              Every product becomes a programmable asset in the digital economy.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/assets/svg/instagram_icon.svg" alt="Instagram" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="https://x.com/HubsaiOfficial" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/assets/svg/x_icon.svg" alt="X (Twitter)" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/assets/svg/discord_icon.svg" alt="Discord" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/assets/svg/telegram_icon.svg" alt="Telegram" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/assets/svg/linkedin_icon.svg" alt="LinkedIn" className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Tokenomics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Roadmap</a></li>
            </ul>
          </motion.div>
          
          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Whitepaper</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Support</a></li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            © 2025 HubsAI. All rights reserved. Building the future of retail.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;