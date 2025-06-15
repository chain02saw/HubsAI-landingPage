import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section id="newsletter" className="py-24 bg-gradient-to-b from-dark-900 to-dark-950 relative">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 to-primary-800/10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
            Be the First to Know
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive waitlist and get early access to the future of retail. 
            Plus, receive special airdrop rewards when we launch!
          </p>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 backdrop-blur-sm text-lg"
              required
            />
            <motion.button
              type="submit"
              className="px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-2xl transition-all duration-300 text-lg border border-primary-400/50 shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(20, 184, 166, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitted}
            >
              {isSubmitted ? '✓ Joined!' : 'Join Waitlist'}
            </motion.button>
          </motion.form>
          
          <motion.p 
            className="text-gray-400 mt-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            No spam, ever. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;