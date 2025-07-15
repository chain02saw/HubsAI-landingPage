
import axios from 'axios';

// Use Vite's environment variable format
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const transferNFT = async (transferAddress: string, NFTAddress: string, userEmail: string) => {
    const response = await axios.post(`${backendUrl}/api/transferNFT`, { transferAddress, NFTAddress, userEmail });
    return response.data;
};

