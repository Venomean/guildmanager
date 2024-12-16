import React, { useState, useEffect } from 'react';
import { fetchGuildMembers, deleteGuildMember, GuildMember } from './services/api';
import GuildMemberCard from './components/GuildMemberCard';

const App: React.FC = () => {
    const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);

    useEffect(() => {
        const loadGuildMembers = async () => {
            try {
                const data = await fetchGuildMembers();
                setGuildMembers(data);
            } catch (error) {
                console.error('Failed to fetch guild members.');
            }
        };

        loadGuildMembers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteGuildMember(id);
            setGuildMembers(guildMembers.filter(member => member.id !== id));
        } catch (error) {
            console.error('Failed to delete guild member.');
        }
    };

    return (
        <div style={appStyle}>
            <h1>Guild Members</h1>
            <div style={cardContainerStyle}>
                {guildMembers.map((member) => (
                    <GuildMemberCard
                        key={member.id}
                        member={member}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

const appStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    padding: '16px',
    textAlign: 'center',
};

const cardContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
};

export default App;