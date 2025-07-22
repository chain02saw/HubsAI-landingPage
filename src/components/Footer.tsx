import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-display font-bold text-white">HubsAI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionizing retail through the power of AI and real-world asset tokenization. 
              Join us in building the future of commerce.
            </p>
            <div className="flex space-x-4">
              
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://x.com/HubsaiOfficial" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* X (Twitter) icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.162 5.656c.015.211.015.423.015.636 0 6.49-4.941 13.973-13.973 13.973-2.777 0-5.366-.813-7.548-2.213.386.045.772.06 1.173.06 2.305 0 4.423-.772 6.116-2.08-2.162-.045-3.984-1.465-4.607-3.423.303.045.606.075.924.075.439 0 .879-.06 1.288-.166-2.252-.454-3.948-2.438-3.948-4.827v-.06c.666.371 1.431.606 2.243.636-1.334-.893-2.207-2.414-2.207-4.142 0-.909.242-1.758.666-2.489 2.431 2.989 6.075 4.941 10.173 5.151-.075-.363-.121-.742-.121-1.121 0-2.727 2.212-4.939 4.939-4.939 1.424 0 2.713.606 3.617 1.576 1.121-.211 2.182-.63 3.136-1.197-.378 1.182-1.182 2.166-2.242 2.777 1-.121 1.97-.386 2.863-.772-.666.984-1.5 1.848-2.463 2.543z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Tokenomics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Whitepaper</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Community</a></li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-white/10 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            © 2025 HubsAI. All rights reserved. Built for the future of retail.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;