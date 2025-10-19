// API Service for Braindler Assistant Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface AicsScript {
  id: number;
  name: string;
  jsonData: any;
  createdAt: string;
  updatedAt: string;
}

// AICS Scripts API
export const scriptsApi = {
  getAll: async (): Promise<AicsScript[]> => {
    const response = await fetch(`${API_BASE_URL}/scripts`);
    if (!response.ok) throw new Error('Failed to fetch scripts');
    return response.json();
  },

  getById: async (id: number): Promise<AicsScript> => {
    const response = await fetch(`${API_BASE_URL}/scripts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch script');
    return response.json();
  },

  create: async (data: { name: string; jsonData: any }): Promise<AicsScript> => {
    const response = await fetch(`${API_BASE_URL}/scripts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create script');
    return response.json();
  },

  update: async (id: number, data: { name: string; jsonData: any }): Promise<AicsScript> => {
    const response = await fetch(`${API_BASE_URL}/scripts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update script');
    return response.json();
  },

  delete: async (id: number): Promise<{ success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/scripts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete script');
    return response.json();
  },
};

// Dialog History API (mock for now)
export interface Dialog {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: string;
}

export const dialogsApi = {
  getAll: async (): Promise<Dialog[]> => {
    // Mock data for now
    return [];
  },
};

// Documents API (mock for now)
export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const documentsApi = {
  getAll: async (): Promise<Document[]> => {
    // Mock data for now
    return [];
  },
};

// Monitoring API (mock for now)
export interface MonitoringData {
  timestamp: string;
  activeUsers: number;
  messagesProcessed: number;
  errorRate: number;
}

export const monitoringApi = {
  getMetrics: async (): Promise<MonitoringData[]> => {
    // Mock data for now
    return [];
  },
};


