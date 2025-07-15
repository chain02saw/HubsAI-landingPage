import axios from 'axios';

// Use Vite's environment variable format
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export interface ProfileSetupData {
    username: string;
    country: string;
    avatar?: File | null;
    interests: string[];
    emailCommunications: boolean;
    hubsStakingInterest: boolean;
}

export const signUpWithBackend = async (fullname: string, email: string, password: string) => {
    const response = await axios.post(`${backendUrl}/api/auth/signup`, { fullname, email, password });
    return response.data;
};

export const signInWithBackend = async (email: string, password: string) => {
    const response = await axios.post(`${backendUrl}/api/auth/signin`, { email, password });
    return response.data;
};

export const getUserClaimWalletAddress = async (email: string) => {
    const response = await axios.post(`${backendUrl}/api/auth/claim-wallet-address`, { email });
    return response.data;
};

export const setupUserProfile = async (userData: any) => {
    try {
        const response = await axios.post(`${backendUrl}/api/auth/setup-profile`, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || 'Failed to setup profile',
                status: error.response?.status,
                data: error.response?.data
            };
        }
        throw { 
            message: 'Failed to setup profile',
            error
        };
    }
};

export const updateUserProfile = async (userData: any) => {
    const response = await axios.post(`${backendUrl}/api/auth/update-profile`, userData);
    return response.data;
};

export const getUserNFTsWithBackend = async (email: string) => {
    const response = await axios.post(`${backendUrl}/api/getUserNFTs`, { email });
    return response.data;
};
