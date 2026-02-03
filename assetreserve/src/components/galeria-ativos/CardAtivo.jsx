export default function CardAtivo({ ativo, onClick }) {
    return (
      <div
        onClick={() => onClick && onClick(ativo)}
        className="border border-[#eee] p-4 bg-white rounded-xl shadow-md 
                   transition-transform duration-300 ease-in-out 
                   transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
      >
        <img
          className="w-full h-[200px] object-cover rounded-lg mb-3"
          src={ativo.imagemUrl}
          alt={ativo.titulo}
        />
  
        <h3 className="font-bold text-[#0B2545] text-lg">
          {ativo.titulo}
        </h3>
  
        <p className="text-sm text-gray-500">
          {ativo.categoria} • {ativo.capacidade}
        </p>
      </div>
    );
  }
  