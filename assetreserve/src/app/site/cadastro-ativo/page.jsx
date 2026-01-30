'use client'

import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

export default function CadastroAtivo() {
  const [formAtivo, setFormAtivo] = useState({
    nome: '',
    categoria: 'Sala',
    capacidade: 'Baixa',
    disponivel: true,
    imagem: null,
    detalhes: '',
  })

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      let imagePath = null

      // 📸 Upload da imagem (opcional)
      if (formAtivo.imagem) {
        const fileExt = formAtivo.imagem.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const filePath = `ativos/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('ativos-images')
          .upload(filePath, formAtivo.imagem)

        if (uploadError) {
          console.error('Erro no upload:', uploadError)
          alert('Erro ao enviar imagem')
          return
        }

        imagePath = filePath
      }

      // 🧠 INSERT (alinhado com o schema real)
      const { data, error } = await supabase
        .from('ativos')
        .insert({
          titulo: formAtivo.nome,
          categoria: formAtivo.categoria,
          capacidade: formAtivo.capacidade,
          disponivel: true,
          imagem: imagePath,
          detalhes: formAtivo.detalhes,
        })
        
      if (error) {
        console.error('Erro ao inserir:', error)
        alert('Erro ao cadastrar ativo')
        return
      }

      console.log('Ativo criado:', data)
      alert('Ativo cadastrado com sucesso!')

      // 🔄 Reset
      setFormAtivo({
        nome: '',
        categoria: 'Sala',
        capacidade: 'Baixa',
        disponivel: true,
        imagem: null,
        detalhes: '',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormAtivo(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#0B2545] text-center mb-6">
          Cadastro de Ativos
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Nome do ativo
            </label>
            <input
              type="text"
              name="nome"
              required
              value={formAtivo.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Categoria
            </label>
            <select
              name="categoria"
              value={formAtivo.categoria}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="Sala">Sala</option>
              <option value="Equipamento">Equipamento</option>
            </select>
          </div>

          {/* Capacidade */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Capacidade
            </label>
            <select
              name="capacidade"
              value={formAtivo.capacidade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          {/* Imagem */}
          <div>
            <label className="block text-sm font-medium text-[#0B2545] mb-1">
              Imagem
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e =>
                setFormAtivo(prev => ({
                  ...prev,
                  imagem: e.target.files?.[0] || null,
                }))
              }
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"
            />
          </div>

          {/* Botão */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0B2545] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#163b6b] disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
