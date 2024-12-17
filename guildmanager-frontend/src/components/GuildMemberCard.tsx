import React, { useState } from 'react';
import { GuildMember, updateGuildMember } from '../services/api';

interface GuildMemberCardProps {
    member: GuildMember;
    onDelete: (id: string) => void;
    onUpdate: (updatedMember: GuildMember) => void;  // Update prop to receive the updated member
}

const GuildMemberCard: React.FC<GuildMemberCardProps> = ({ member, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMember, setEditedMember] = useState(member);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedMember({ ...editedMember, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateGuildMember(editedMember.id, editedMember);
            onUpdate(editedMember); // Notify parent to update the guildMembers state
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error('Failed to update guild member.');
        }
    };

    return (
        <div style={cardStyle}>
            {isEditing ? (
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input
                        type="text"
                        name="name"
                        value={editedMember.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="characterClass"
                        value={editedMember.characterClass}
                        onChange={handleInputChange}
                        placeholder="Class"
                    />
                    <input
                        type="number"
                        name="level"
                        value={editedMember.level}
                        onChange={handleInputChange}
                        placeholder="Level"
                    />
                    <input
                        type="text"
                        name="role"
                        value={editedMember.role}
                        onChange={handleInputChange}
                        placeholder="Role"
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <h3>{member.name}</h3>
                    <p>Class: {member.characterClass}</p>
                    <p>Level: {member.level}</p>
                    <p>Role: {member.role}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(member.id)}>Delete</button>
                </>
            )}
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    width: '300px',
    textAlign: 'left',
};

const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

export default GuildMemberCard;
