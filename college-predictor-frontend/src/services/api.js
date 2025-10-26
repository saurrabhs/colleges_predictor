import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Login failed";
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Registration failed";
    }
  },

  verifyOtp: async (email, otp) => {
    try {
      const response = await api.post("/users/verify-otp", { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "OTP verification failed";
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post("/users/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to send OTP";
    }
  },

  resetPassword: async (data) => {
    try {
      const response = await api.post("/users/reset-password", data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to reset password";
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// College API
export const collegeAPI = {
  // Get all colleges with pagination
  getAllColleges: async (page = 1, limit = 15) => {
    try {
      const response = await api.get(`/colleges?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch colleges";
    }
  },

  // Predict colleges based on user criteria with pagination
  predictColleges: async (predictionData, page = 1, limit = 15) => {
    try {
      const requestData = { ...predictionData, page, limit };
      const response = await api.post("/colleges/predict", requestData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to predict colleges";
    }
  },

  // Get college by ID
  getCollegeById: async (id) => {
    try {
      const response = await api.get(`/colleges/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch college";
    }
  },
};

// College List API
export const collegeListAPI = {
  // Get user's college list
  getCollegeList: async () => {
    try {
      const response = await api.get("/college-list");
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch college list";
    }
  },

  // Add college to user's list
  addCollegeToList: async (collegeData) => {
    try {
      const response = await api.post("/college-list/add", collegeData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw (
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to add college to list"
      );
    }
  },

  // Remove college from user's list
  removeCollegeFromList: async (collegeId, branch) => {
    try {
      const response = await api.delete(
        `/college-list/remove/${collegeId}/${branch}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to remove college from list";
    }
  },

  // Update college ranking
  updateCollegeRank: async (collegeId, branch, newRank) => {
    try {
      const response = await api.put("/college-list/rank", {
        collegeId,
        branch,
        newRank,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to update college rank";
    }
  },

  // Clear entire college list
  clearCollegeList: async () => {
    try {
      const response = await api.delete("/college-list/clear");
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to clear college list";
    }
  },
};

// Counselling API
export const counsellingAPI = {
  // Send message to AI counsellor
  sendMessage: async (data) => {
    try {
      console.log('[API] Sending message to /counselling/chat:', data);
      const response = await api.post("/counselling/chat", data);
      console.log('[API] Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('[API] Error sending message:', error.response || error);
      
      // Detailed error handling
      if (error.response) {
        // Server responded with error
        const errorData = error.response.data;
        const errorMessage = errorData?.error || errorData?.message || "Failed to send message";
        console.error('[API] Server error:', errorMessage, errorData);
        throw errorMessage;
      } else if (error.request) {
        // Request made but no response
        console.error('[API] No response from server');
        throw "Cannot reach server. Please check if the backend is running.";
      } else {
        // Error in setting up request
        console.error('[API] Request setup error:', error.message);
        throw error.message || "Failed to send message";
      }
    }
  },

  // Get all counselling sessions
  getSessions: async () => {
    try {
      const response = await api.get("/counselling/sessions");
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch sessions";
    }
  },

  // Get a specific session
  getSession: async (sessionId) => {
    try {
      const response = await api.get(`/counselling/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch session";
    }
  },

  // Delete a session
  deleteSession: async (sessionId) => {
    try {
      const response = await api.delete(`/counselling/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to delete session";
    }
  },

  // Clear conversations in a session
  clearSession: async (sessionId) => {
    try {
      const response = await api.delete(
        `/counselling/sessions/${sessionId}/clear`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to clear session";
    }
  },
};

// Contact API
export const contactAPI = {
  // Send contact form
  sendContactForm: async (formData) => {
    try {
      const response = await api.post("/contact", formData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to send message";
    }
  },
};

export default api;
