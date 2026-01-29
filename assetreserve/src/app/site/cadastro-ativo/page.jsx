'use client'
import { supabase } from '@/lib/supabaseClient'
import { useState } from "react";

export  default function CadastroAtivo() {
    const [formAtivo, setFormAtivo] = useState({
        nome: "",
        categoria: "Sala",
        capacidade: "Baixa",
        disponivel: true,
        imagem: "",
        detalhes: "",
    })
    
    async function handleSubmit(e) {
        e.preventDefault()
        
        let imagePath = null

        if (formAtivo.imagem) {
            const fileExt = formAtivo.imagem.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `private/${fileName}`

            const { error: uploadError } = await supabase.storage
            .from('ativos-images')
            .upload(filePath, formAtivo.imagem)

            if (uploadError) {
                console.error('Erro ao enviar imagem:', uploadError)
                alert('Erro ao enviar imagem')
                return
            }
            
            imagePath = filePath
        }
        const { error } = await supabase
        .from('ativos')
        .insert({
            titulo: formAtivo.nome,
            categoria: formAtivo.categoria,
            capacidade: formAtivo.capacidade,
            disponivel: true,
            imagem: imagePath,
            detalhes: formAtivo.detalhes,
        }).select()

        if (error) {
            console.error('Erro ao inserir: ', error)
            alert('Erro ao cadastrar ativo')
            return
        }

        alert('Ativo cadastrado com sucesso!')

        setFormAtivo({
            nome: "",
            categoria: "Sala",
            capacidade: "Baixa",
            disponivel: "TRUE",
            imagem: "",
            detalhes: "",
        })
    }

    function handleChange(e) {
        const {name, value } = e.target
        setFormAtivo(prev => ({
            ...prev,
            [name]: value,
        }))
    }


    return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        
        {/* Título */}
        <h2 className="text-3xl font-bold text-[#0B2545] text-center mb-2">
          Cadastro de Ativos
        </h2>

        {/* Formulário */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Nome do ativo */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Nome do ativo
            </label>
            <input
              type="text"
              placeholder="Digite o nome do ativo"
              name="nome"
              value={formAtivo.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Categoria do ativo */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Categoria do ativo
            </label>
            <select name="categoria" value={formAtivo.categoria} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]">
            <option value="Sala">Sala</option>
            <option value="Equipamento">Equipamento</option>
            </select>
          </div>

          {/* Capacidade do Ativo */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Capacidade do Ativo
            </label>
            <select name="capacidade" value={formAtivo.capacidade} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
            </select>
          </div>

          {/* IMAGEM */}
            <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
                Imagem
            </label>
            <input className='
                block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-100 file:text
                hover:file:bg-gray-200'
                type="file"
                accept="image/*"
                onChange={(e) => setFormAtivo({
                ...formAtivo,
                imagem: e.target.files[0]  // guarda o File object
                })}
            />
            </div>



          {/* Detalhes */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Detalhes
            </label>
            <textarea
              rows="4"
              name="detalhes"
              value={formAtivo.detalhes}
              onChange={handleChange}
              placeholder="Digite os detalhes"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            />
          </div>

          {/* Botão */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0B2545] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#163b6b] transition duration-300"
            >
              Confirmar
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
