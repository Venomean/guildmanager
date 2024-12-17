import React, { useState, useEffect } from 'react';
import { fetchGuildMembers, deleteGuildMember, createGuildMember, GuildMember } from './services/api';
import GuildMemberCard from './components/GuildMemberCard';
import "./index.css";

const App: React.FC = () => {
    const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
    const [newMember, setNewMember] = useState<Omit<GuildMember, 'id'>>({
        name: '',
        characterClass: '',
        level: 0,
        role: '',
    });

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

    const handleCreate = async () => {
        try {
            const createdMember = await createGuildMember(newMember);
            setGuildMembers([...guildMembers, createdMember]);
            setNewMember({ name: '', characterClass: '', level: 0, role: '' });
        } catch (error) {
            console.error('Failed to create guild member.');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteGuildMember(id);
            setGuildMembers(guildMembers.filter(member => member.id !== id));
        } catch (error) {
            console.error('Failed to delete guild member.');
        }
    };

    // Update the guild member in state
    const handleUpdate = (updatedMember: GuildMember) => {
        setGuildMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === updatedMember.id ? updatedMember : member
            )
        );
    };

    return (
        <div style={appStyle}>
            <h1>Guild Members</h1>

            <div>
                <input
                    type="text"
                    name="name"
                    value={newMember.name}
                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="characterClass"
                    value={newMember.characterClass}
                    onChange={e => setNewMember({ ...newMember, characterClass: e.target.value })}
                    placeholder="Character Class"
                />
                <input
                    type="number"
                    name="level"
                    value={newMember.level}
                    onChange={e => setNewMember({ ...newMember, level: +e.target.value })}
                    placeholder="Level"
                />
                <input
                    type="text"
                    name="role"
                    value={newMember.role}
                    onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="Role"
                />
                <button onClick={handleCreate}>Create</button>
            </div>

            <div style={cardContainerStyle}>
                {guildMembers.map((member) => (
                    <GuildMemberCard
                        key={member.id}
                        member={member}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}  // Pass the onUpdate function to update state
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