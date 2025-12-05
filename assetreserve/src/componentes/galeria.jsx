import ativos from "../data.js"

function Galeria() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ativos.map(ativo => (
                <div key={ativo.id} className=" w-[300px] border border-[#eee] p-4 bg-white rounded-xl shadow-md transition-transform duration-300 ease-in-out transform hover:translate-y-[-8px] hover:shadow-lg" data-categoria={ativo.categoria}>
                    <img className="w-full h-[200px] object-cover rounded-lg" src={ativo.imagem} alt={ativo.titulo}/>
                    <h3>{ativo.titulo}</h3>
                </div>
            ))}
        </div>
    )
}

export default Galeria;