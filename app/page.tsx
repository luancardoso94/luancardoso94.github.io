// app/page.tsx
'use client';

import { useState } from 'react';
import SearchForm from './components/SearchForm'; // Supondo que você use alias '@/' para a pasta raiz
import ResultsList from './components/ResultsList';

// Tipagem para os dados
type Profession = {
  id: string;
  title: string;
  description: string;
  area: { name:string };
  skills: { id: string; name: string }[];
};

export default function HomePage() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar os dados com base nos filtros
  const handleSearch = async (filters: { keyword: string; areaId: string; skillId: string }) => {
    setLoading(true);
    
    // Constrói a query string dinamicamente
    const params = new URLSearchParams();
    if (filters.keyword) params.append('keyword', filters.keyword);
    if (filters.areaId) params.append('areaId', filters.areaId);
    if (filters.skillId) params.append('skillId', filters.skillId); // Note: renomeie para 'skillId' para consistência

    try {
      const response = await fetch(`/professions/search?${params.toString()}`);
      if (!response.ok) throw new Error('Falha ao buscar dados');
      
      const data: Profession[] = await response.json();
      setProfessions(data);
    } catch (error) {
      console.error(error);
      setProfessions([]);
    } finally {
      setLoading(false);
    }
  };
  
  // A busca inicial pode ser removida se você preferir que a página comece vazia
  // useEffect(() => { handleSearch({ keyword: '', areaId: '', skillId: '' }); }, []);

  return (
    <main>
      <h1>Encontre sua Profissão</h1>
      <SearchForm onSearch={handleSearch} />
      <ResultsList professions={professions} loading={loading} />
    </main>
  );
}