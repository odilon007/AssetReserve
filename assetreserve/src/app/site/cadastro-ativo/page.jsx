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

  // Manipula campos de texto e select
  function handleChange(e) {
    const { name, value } = e.target
    setFormAtivo(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manipula especificamente o upload de imagem
  function handleImageChange(e) {
    const file = e.target.files?.[0] || null
    setFormAtivo(prev => ({
      ...prev,
      imagem: file,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      let imagePath = null

      // 1. Upload da imagem (se houver)
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

      // 2. Insert no Banco de Dados
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
        
      if (error) {
        throw error
      }

      console.log('Ativo criado:', data)
      alert('Ativo cadastrado com sucesso!')

      // 3. Reset do formulário
      setFormAtivo({
        nome: '',
        categoria: 'Sala',
        capacidade: 'Baixa',
        disponivel: true,
        imagem: null,
        detalhes: '',
      })
      
      // Reset manual do input de arquivo
      document.getElementById('input-imagem').value = ""

    } catch (error) {
      console.error('Erro geral:', error)
      alert('Erro ao cadastrar ativo. Verifique o console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        
        <h2 className="text-3xl font-bold text-[#0B2545] text-center mb-6">
          Cadastro de Ativos
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <FormInput
            label="Nome do ativo"
            id="nome"
            name="nome"
            required
            value={formAtivo.nome}
            onChange={handleChange}
            placeholder="Ex: Sala de Reunião A"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            id="input-imagem" // ID usado para resetar o campo depois
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            // Nota: Inputs do tipo file não aceitam a prop "value" controlada
          />

          <FormTextArea
            label="Detalhes e Observações"
            id="detalhes"
            name="detalhes"
            value={formAtivo.detalhes}
            onChange={handleChange}
            placeholder="Descreva o ativo..."
          />

          <div className="text-center pt-2">
            <Button type="submit" isLoading={loading}>
              Confirmar Cadastro
            </Button>
          </div>

        </form>
      </div>
    </section>
  )
}