import React, { useState } from "react";
import { motion } from "framer-motion";

interface ProfileSetupStepProps {
  onNext: (data: any) => void;
}

interface ProfileData {
  username: string;
  country: string;
  avatar: File | null;
  interests: string[];
  emailCommunications: boolean;
  hubsStakingInterest: boolean;
}

export const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({
  onNext,
}) => {
  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    country: "",
    avatar: null,
    interests: [],
    emailCommunications: false,
    hubsStakingInterest: false,
  });
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" },
    { code: "BR", name: "Brazil" },
    { code: "IN", name: "India" },
    { code: "SG", name: "Singapore" },
    { code: "OTHER", name: "Other" },
  ];

  // Updated interests - removed Food and Travel, added RWA and Crypto
  const interestOptions = [
    "Fashion",
    "Technology", 
    "Gaming",
    "RWA and crypto", // Real World Assets
    "Crypto",
    "Sports",
    "Music",
    "Art",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (name: keyof ProfileData) => {
    setFormData({
      ...formData,
      [name]: !formData[name],
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.country) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onNext(formData);
    }, 1000);
  };

  const generateUsername = () => {
    // Generate a random username since we don't have fullName anymore
    const adjectives = ['Smart', 'Quick', 'Bright', 'Swift', 'Bold', 'Cool'];
    const nouns = ['Trader', 'Hodler', 'Builder', 'Staker', 'Miner', 'Explorer'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    setFormData({ ...formData, username: `${randomAdj}${randomNoun}${randomNum}` });
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
          Complete Your Profile
        </motion.h2>
        <motion.p
          className="text-slate-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Customize your HubsAI experience and connect with the community
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
          <label className="block text-sm font-medium text-slate-300 mb-4">
            Profile Picture
          </label>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 bg-slate-800 border-2 border-dashed border-slate-600 rounded-full flex items-center justify-center overflow-hidden">
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
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              Upload Photo
            </label>
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Username / Handle *
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
            />
            <button
              type="button"
              onClick={generateUsername}
              className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl transition-colors text-sm"
            >
              Generate
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            This will be your unique identifier in the HubsAI community
          </p>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-slate-800">
              Select your country
            </option>
            {countries.map((country) => (
              <option
                key={country.code}
                value={country.code}
                className="bg-slate-800"
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Interests (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {interestOptions.map((interest) => (
              <label
                key={interest}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-colors cursor-pointer ${
                  formData.interests.includes(interest)
                    ? "bg-blue-500/20 border border-blue-500/50 text-blue-300"
                    : "bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300"
                }`}
              >
                <div className="checkbox-container simple">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                </div>
                <span className="text-sm">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Email Communications Checkbox */}
        <div>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={formData.emailCommunications}
              onChange={() => handleCheckboxChange('emailCommunications')}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            <div className="checkbox-label">
              <div className="flex items-start space-x-3">
                <span className="text-lg">📧</span>
                <div>
                  <div className="font-medium text-white">
                    I'm open to email communications
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    Receive updates about new features, rewards, and community events
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* HUBS Staking Interest Checkbox */}
        <div>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={formData.hubsStakingInterest}
              onChange={() => handleCheckboxChange('hubsStakingInterest')}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            <div className="checkbox-label">
              <div className="flex items-start space-x-3">
                <span className="text-lg">💰</span>
                <div>
                  <div className="font-medium text-white">
                    I'm interested in buying and staking $HUBS to reap platform rewards
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    Learn about staking opportunities and exclusive rewards for $HUBS holders
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading || !formData.username || !formData.country}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300"
          whileHover={
            !loading && formData.username && formData.country
              ? {
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
                }
              : {}
          }
          whileTap={!loading ? { scale: 0.98 } : {}}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Completing Profile...
            </div>
          ) : (
            "Join Community"
          )}
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-slate-300">
          <span className="text-blue-400">🔒 Privacy:</span> Your information is
          secure and will only be used to personalize your HubsAI experience and
          send you relevant updates if you've opted in.
        </p>
      </motion.div>
    </div>
  );
};