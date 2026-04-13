const BASE_URL = 'http://127.0.0.1:8000';

function getHeaders() {
  const token = localStorage.getItem('zism_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
}

export const api = {
  register: async (password) => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },
  
  login: async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  },

  addFriend: async (friendCode) => {
    const res = await fetch(`${BASE_URL}/channels/add-friend`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ friend_code: friendCode })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Could not add friend');
    }
    return res.json();
  },

  getChannels: async () => {
    const res = await fetch(`${BASE_URL}/channels/`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch channels');
    return res.json();
  },

  sendMessage: async (channelId, text) => {
    const res = await fetch(`${BASE_URL}/messages/${channelId}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Message sending failed');
    return res.json();
  },

  getMessages: async (channelId) => {
    const res = await fetch(`${BASE_URL}/messages/${channelId}`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  }
};
