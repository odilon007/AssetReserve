'use client'

import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextArea } from "@/components/form/FormTextArea";
import { Button } from "@/components/form/Button";

export default function CadastroAtivo() {
  const [loading, setLoading] = useState(false)
  const [formAtivo, setFormAtivo] = useState({
    nome: '',
    categoria: 'Sala',
    capacidade: 'Baixa',
    disponivel: true,
    imagem: null,
    detalhes: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormAtivo(prev => ({ ...prev, [name]: value }))
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0] || null
    setFormAtivo(prev => ({ ...prev, imagem: file }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      let imagePath = null

      // 1. Upload
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

      // 2. Insert
      const { data, error } = await supabase
        .from('ativos')
        .insert({
          titulo: formAtivo.nome,
          categoria: formAtivo.categoria,
          capacidade: formAtivo.capacidade,
          disponivel: formAtivo.disponivel,
          imagem: imagePath,
          detalhes: formAtivo.detalhes,
        })
        
      if (error) throw error

      alert('Ativo cadastrado com sucesso!')

      // 3. Reset
      setFormAtivo({
        nome: '',
        categoria: 'Sala',
        capacidade: 'Baixa',
        disponivel: true,
        imagem: null,
        detalhes: '',
      })
      
      const fileInput = document.getElementById('input-imagem');
      if (fileInput) fileInput.value = "";

    } catch (error) {
      console.error('Erro geral:', error)
      alert('Erro ao cadastrar ativo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Ajuste: py-8 para mobile, py-16 para desktop
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 md:py-16">
      {/* Ajuste: p-6 para mobile, p-8 para desktop */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        
        {/* Ajuste: Texto menor no mobile (2xl) e maior no desktop (3xl) */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B2545] text-center mb-6">
          Cadastro de Ativos
        </h2>

        {/* Ajuste: Espaçamento vertical condicional */}
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          
          <FormInput
            label="Nome do ativo"
            id="nome"
            name="nome"
            required
            value={formAtivo.nome}
            onChange={handleChange}
            placeholder="Ex: Sala de Reunião A"
          />

          {/* Grid já estava bom, mantive cols-1 (mobile) para cols-2 (md) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FormSelect
              label="Categoria"
              id="categoria"
              name="categoria"
              value={formAtivo.categoria}
              onChange={handleChange}
            >
              <option value="Sala">Sala</option>
              <option value="Equipamento">Equipamento</option>
            </FormSelect>

            <FormSelect
              label="Capacidade"
              id="capacidade"
              name="capacidade"
              value={formAtivo.capacidade}
              onChange={handleChange}
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </FormSelect>
          </div>

          <FormInput
            label="Imagem de destaque"
            id="input-imagem"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <FormTextArea
            label="Detalhes e Observações"
            id="detalhes"
            name="detalhes"
            value={formAtivo.detalhes}
            onChange={handleChange}
            placeholder="Descreva o ativo..."
          />

          <div className="text-center pt-2 md:pt-4">
            <Button type="submit" isLoading={loading} className="w-full md:w-auto">
              Confirmar Cadastro
            </Button>
          </div>

        </form>
      </div>
    </section>
  )
}