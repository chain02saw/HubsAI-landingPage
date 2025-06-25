import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

// Optimized: Moved form validation outside component to prevent recreation
const validateForm = (formData: any, isLogin: boolean) => {
  const errors: { [key: string]: string } = {};

  if (!formData.email || !formData.password) {
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    return { isValid: false, errors };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isLogin) {
    if (!formData.name) errors.name = 'Name is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const LoginModal: React.FC<LoginModalProps> = React.memo(({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false); // Add closing state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const { signUp, signIn } = useAuth();

  // Optimized: Memoized input handler to prevent recreation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }, [error]);

  // Optimized: Memoized form validation
  const { isValid, errors } = useMemo(() => 
    validateForm(formData, isLogin), 
    [formData, isLogin]
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid || loading || isClosing) return;

    setLoading(true);
    setError(null);

    try {
      let result;
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, formData.name);
      }

      if (result.success) {
        // Reset form first
        resetForm();
        
        // Set closing state to prevent double-clicks
        setIsClosing(true);
        
        // Close modal with a slight delay to ensure smooth transition
        setTimeout(() => {
          onClose();
          
          // Call onLoginSuccess after modal is fully closed
          setTimeout(() => {
            if (onLoginSuccess && typeof onLoginSuccess === 'function') {
              try {
                onLoginSuccess();
              } catch (err) {
                console.error('Error calling onLoginSuccess:', err);
              }
            }
            setIsClosing(false);
          }, 300); // Wait for modal close animation
        }, 100);
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  }, [isValid, loading, isClosing, isLogin, formData, signIn, signUp, onClose, onLoginSuccess]);

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setError(null);
  }, []);

  const toggleMode = useCallback(() => {
    if (loading || isClosing) return; // Prevent toggle during loading or closing
    setIsLogin(!isLogin);
    resetForm();
  }, [isLogin, loading, isClosing, resetForm]);

  const handleClose = useCallback(() => {
    if (loading || isClosing) return; // Prevent close during loading or closing
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      // Reset form when modal is closed
      setTimeout(resetForm, 100);
    }, 100);
  }, [loading, isClosing, onClose, resetForm]);

  // Don't render if closing to prevent flicker
  if (isClosing) return null;

  // Optimized: Memoized form fields to prevent recreation
  const formFields = useMemo(() => (
    <>
      {!isLogin && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 backdrop-blur-sm transition-all"
            placeholder="Enter your full name"
            required={!isLogin}
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </motion.div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 backdrop-blur-sm transition-all"
          placeholder="Enter your email"
          required
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 backdrop-blur-sm transition-all"
          placeholder="Enter your password"
          required
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {!isLogin && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 backdrop-blur-sm transition-all"
            placeholder="Confirm your password"
            required={!isLogin}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </motion.div>
      )}
    </>
  ), [isLogin, formData, errors, handleInputChange, loading]);

  return (
    <AnimatePresence>
      {isOpen && !isClosing && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
            <motion.div
              className="glass rounded-3xl p-8 w-full max-w-md relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-3xl" />
              
              {/* Close button */}
              <motion.button
                onClick={handleClose}
                disabled={loading}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                whileHover={!loading ? { scale: 1.1 } : {}}
                whileTap={!loading ? { scale: 0.9 } : {}}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <motion.h2
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {isLogin ? 'Welcome Back' : 'Join HubsAI'}
                </motion.h2>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {isLogin ? 'Sign in to access your account' : 'Create your account to claim your airdrop'}
                </motion.p>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 text-red-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {formFields}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading || !isValid || isClosing}
                  className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 border border-primary-400/50 shadow-lg"
                  whileHover={!loading && isValid && !isClosing ? { 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(20, 184, 166, 0.4)"
                  } : {}}
                  whileTap={!loading && isValid && !isClosing ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </motion.button>
              </motion.form>

              {/* Toggle login/signup */}
              <motion.div
                className="text-center mt-6 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-gray-300">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleMode}
                    disabled={loading || isClosing}
                    className="ml-2 text-primary-400 hover:text-primary-300 disabled:opacity-50 font-medium transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
});

LoginModal.displayName = 'LoginModal';

export default LoginModal;