// components/SearchForm.tsx
'use client';

import React, { useState, useEffect, FormEvent } from 'react';

type Area = { id: string; name: string };
type Skill = { id: string; name: string };

type SearchFormProps = {
    onSearch: (filters: { keyword: string; areaId: string; skillId: string }) => void;
};

const SearchForm = ({ onSearch }: SearchFormProps) => {
    // Estados para os filtros
    const [keyword, setKeyword] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');

    // Estados para popular os selects
    const [areas, setAreas] = useState<Area[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);

    // Buscar Areas e skills quando o componente montar
    useEffect(() => {
        const fetchFilters = async () => {
            // Fetch Areas
            const areaRes = await fetch('/api/areas');
            const areaData = await areaRes.json();
            setAreas(areaData);

            // Fetch Skills
            const skillRes = await fetch('/api/skills');
            const skillData = await skillRes.json();
            setSkills(skillData);
        };

        fetchFilters();
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch({ keyword, areaId: selectedArea, skillId: selectedSkill });
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="full-width">
                <input
                    type="text"
                    placeholder="Palavra-chave (ex: Frontend, Enfermagem)"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div>
                <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                    <option value="">Todas as Areas</option>
                    {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                            {area.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                    <option value="">Todas as Habilidades</option>
                    {skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="full-width">
                Pesquisar
            </button>
        </form>
    );
};

export default SearchForm;