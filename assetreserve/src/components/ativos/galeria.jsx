import CardAtivo from "./CardAtivo";

function Galeria({ ativos, aoClicar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {ativos.length > 0 ? (
        ativos.map(ativo => (
          <CardAtivo 
          key={ativo.id}
          ativo={ativo}
          onClick={aoClicar}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          Nenhum ativo encontrado com esses filtros.
        </p>
      )}
    </div>
  );
}
    

export default Galeria
