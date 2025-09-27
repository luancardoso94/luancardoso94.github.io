// components/ProfessionCard.tsx
import React from 'react';

// Tipagem para os dados que o card espera receber
type Profession = {
    id: string;
    title: string;
    description: string;
    area: { name: string };
    skills: { id: string; name: string }[];
};

type ProfessionCardProps = {
    profession: Profession;
};

const ProfessionCard = ({ profession }: ProfessionCardProps) => {
    return (
        <div className="profession-card">
            <h2>{profession.title}</h2>
            <p className="area">Area: {profession.area.name}</p>
            <p>{profession.description}</p>
            <div className="skills">
                {profession.skills.map((skill) => (
                    <span key={skill.id} className="skill-tag">
                        {skill.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProfessionCard;