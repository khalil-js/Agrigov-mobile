/**
 * API Configuration
 *
 * Change BASE_URL based on your development environment:
 *
 * - iOS Simulator: "http://localhost:8000/api"
 * - Android Emulator: "http://10.0.2.2:8000/api"
 * - Physical Device: "http://YOUR_MACHINE_IP:8000/api"
 * - Production: "https://your-domain.com/api"
 */

// Detect environment - you can override this manually
const getBaseUrl = () => {
  // Uncomment the appropriate line for your setup:

  // iOS Simulator
  // return "http://localhost:8000/api";

  // Android Emulator (default)
  //return "http://10.0.2.2:8000/api";

  // Physical device - replace with your machine's IP
   return "http://192.168.1.100:8000/api";

  // Production
  // return "https://your-production-domain.com/api";
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
