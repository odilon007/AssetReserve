export  default function Contato() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        
        {/* Título */}
        <h2 className="text-3xl font-bold text-[#0B2545] text-center mb-2">
          Fale Conosco
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Tem alguma dúvida, sugestão ou problema com reservas? Entre em contato com a equipe do AssetReserve.
        </p>

        {/* Formulário */}
        <form className="space-y-6">
          
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Nome
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Assunto */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Assunto
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            >
              <option>Dúvida</option>
              <option>Problema com reserva</option>
              <option>Sugestão</option>
              <option>Outro</option>
            </select>
          </div>

          {/* Mensagem */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Mensagem
            </label>
            <textarea
              rows="4"
              placeholder="Digite sua mensagem"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Botão */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0B2545] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#163b6b] transition duration-300"
            >
              Enviar Mensagem
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
