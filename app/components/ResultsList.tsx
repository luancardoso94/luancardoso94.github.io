'use client';

import React from 'react';
import ProfessionCard from './ProfessionCard';

type Profession = {
    id: string;
    title: string;
    description: string;
    area: { name: string };
    skills: { id: string; name: string }[];
};

type ResultsListProps = {
    professions: Profession[];
    loading: boolean;
};

export default function ResultsList({ professions, loading }: ResultsListProps) {
    if (loading) {
        return <p>Carregando...</p>;
    }

    if (professions.length === 0) {
        return <p>Nenhuma profissao encontrada com os filtros selecionados.</p>;
    }

    return (
        <div className="results-list">
            {professions.map((prof) => (
                <ProfessionCard key={prof.id} profession={prof} />
            ))}
        </div>
    );
}
