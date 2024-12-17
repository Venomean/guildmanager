import axios from 'axios';

const API_URL = 'http://localhost:8080/api/members';

export interface GuildMember {
    id: string;
    name: string;
    characterClass: string;
    level: number;
    role: string;
}

export const fetchGuildMembers = async (): Promise<GuildMember[]> => {
    try {
        const response = await axios.get<GuildMember[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching guild members:', error);
        throw error;
    }
};

export const deleteGuildMember = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting guild member:', error);
        throw error;
    }
};

export const updateGuildMember = async (id: string, updatedMember: Omit<GuildMember, 'id'>): Promise<GuildMember> => {
    try {
        const response = await axios.put<GuildMember>(`${API_URL}/${id}`, updatedMember);
        return response.data;
    } catch (error) {
        console.error('Error updating guild member:', error);
        throw error;
    }
};

export const createGuildMember = async (newMember: Omit<GuildMember, 'id'>): Promise<GuildMember> => {
    try {
        const response = await axios.post<GuildMember>(API_URL, newMember);
        return response.data;
    } catch (error) {
        console.error('Error creating guild member:', error);
        throw error;
    }
};
