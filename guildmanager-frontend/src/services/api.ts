import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/members';

// Define the GuildMember type
export interface GuildMember {
    id: string;
    name: string;
    characterClass: string;
    level: number;
    role: string;
}

// Fetch all guild members
export const fetchGuildMembers = async (): Promise<GuildMember[]> => {
    try {
        const response = await axios.get<GuildMember[]>(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching guild members:', error);
        throw error;
    }
};

// Add a new guild member
export const addGuildMember = async (member: Omit<GuildMember, 'id'>): Promise<GuildMember> => {
    try {
        const response = await axios.post<GuildMember>(API_BASE_URL, member);
        return response.data;
    } catch (error) {
        console.error('Error adding guild member:', error);
        throw error;
    }
};

// Update an existing guild member
export const updateGuildMember = async (id: string, updatedMember: Omit<GuildMember, 'id'>): Promise<GuildMember> => {
    try {
        const response = await axios.put<GuildMember>(`${API_BASE_URL}/${id}`, updatedMember);
        return response.data;
    } catch (error) {
        console.error('Error updating guild member:', error);
        throw error;
    }
};

// Delete a guild member
export const deleteGuildMember = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting guild member:', error);
        throw error;
    }
};
