function Galeria({ ativos, aoClicar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {ativos.length > 0 ? (
        ativos.map(ativo => (
          <div
            key={ativo.id}
            onClick={() => aoClicar && aoClicar(ativo)}
            className="p-4 bg-white rounded-xl shadow-md cursor-pointer"
          >
            <img
              className="w-full h-[200px] object-cover rounded-lg mb-3"
              src={ativo.imagemUrl}
              alt={ativo.titulo}
            />
            <h3 className="font-bold">{ativo.titulo}</h3>
            <p>{ativo.categoria} • {ativo.capacidade}</p>
          </div>
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
