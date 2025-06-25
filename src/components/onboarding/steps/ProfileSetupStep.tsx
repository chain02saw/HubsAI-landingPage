// src/components/onboarding/steps/ProfileSetupStep.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfileSetupStepProps {
  onNext: (data: any) => void;
}

interface ProfileData {
  fullName: string;
  username: string;
  country: string;
  avatar: File | null;
}

export const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: '',
    username: '',
    country: '',
    avatar: null
  });
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'BR', name: 'Brazil' },
    { code: 'IN', name: 'India' },
    { code: 'SG', name: 'Singapore' },
    { code: 'OTHER', name: 'Other' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.username || !formData.country) {
      return;
    }
    
    setLoading(true);
    
    // Simulate profile creation
    setTimeout(() => {
      setLoading(false);
      onNext(formData);
    }, 1000);
  };

  const generateUsername = () => {
    const baseName = formData.fullName.toLowerCase().replace(/\s+/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    setFormData({ ...formData, username: `${baseName}${randomNum}` });
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <motion.h2
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Create Your Profile
        </motion.h2>
        <motion.p
          className="text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Tell us about yourself to personalize your HubsAI experience
        </motion.p>
      </div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Avatar Upload */}
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-300 mb-4">Profile Picture</label>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border-2 border-dashed border-white/20 overflow-hidden">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
            >
              Upload Photo
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Username / Handle *
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Choose a username"
            />
            <button
              type="button"
              onClick={generateUsername}
              disabled={!formData.fullName}
              className="px-4 py-3 bg-primary-500/20 hover:bg-primary-500/30 disabled:opacity-50 text-primary-400 rounded-xl transition-colors text-sm"
            >
              Generate
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This will be your unique identifier in the HubsAI community
          </p>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="" className="bg-dark-900">Select your country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code} className="bg-dark-900">
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Interests/Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Interests (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Fashion', 'Technology', 'Gaming', 'Food', 'Travel', 'Sports'].map((interest) => (
              <label key={interest} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 bg-transparent border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-300">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading || !formData.fullName || !formData.username || !formData.country}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300"
          whileHover={!loading ? { 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(20, 184, 166, 0.4)"
          } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Creating Profile...
            </div>
          ) : (
            'Join Community'
          )}
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-gray-300">
          <span className="text-primary-400">🔒 Privacy:</span> Your information is secure and will only be used to personalize your HubsAI experience.
        </p>
      </motion.div>
    </div>
  );
};