import React from 'react';
import { GuildMember } from '../services/api';

interface GuildMemberCardProps {
    member: GuildMember;
    onDelete: (id: string) => void;
}

const GuildMemberCard: React.FC<GuildMemberCardProps> = (props) => {
    const { id, name, characterClass, level, role } = props.member;

    return (
        <div style={cardStyle}>
            <h3>{name}</h3>
            <p>Class: {characterClass}</p>
            <p>Level: {level}</p>
            <p>Role: {role}</p>
            <button style={buttonStyle} onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    width: '200px',
    textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default GuildMemberCard;