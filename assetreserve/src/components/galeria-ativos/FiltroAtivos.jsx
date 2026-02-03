export default function FiltroAtivos({
    filtroCategoria,
    setFiltroCategoria,
    filtroCapacidade,
    setFiltroCapacidade,
  }) {
    return (
      <div className="flex flex-wrap justify-center gap-6 bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <label>Categoria:</label>
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="">Todas</option>
            <option value="Sala">Sala</option>
            <option value="Equipamento">Equipamento</option>
          </select>
        </div>
  
        <div className="flex items-center space-x-3">
          <label>Capacidade:</label>
          <select value={filtroCapacidade} onChange={(e) => setFiltroCapacidade(e.target.value)}>
            <option value="">Todas</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
      </div>
    );
  }
  