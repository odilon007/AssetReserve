
'use client'

import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextArea } from "@/components/form/FormTextArea";
import { Button } from "@/components/form/Button";

export  default function Contato() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário enviado");
  };
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        
        {/* Cabeçalho do Card */}
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#0B2545] mb-2">
            Fale Conosco
          </h2>
          <p className="text-gray-600">
            Tem alguma dúvida, sugestão ou problema com reservas? Entre em contato com a equipe do AssetReserve.
          </p>
        </header>

        {/* Formulário */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <FormInput 
            label="Nome" 
            id="nome"
            type="text" 
            placeholder="Digite seu nome" 
          />

          <FormInput 
            label="E-mail" 
            id="email"
            type="email" 
            placeholder="Digite seu e-mail" 
          />

          <FormSelect label="Assunto" id="assunto">
            <option>Dúvida</option>
            <option>Problema com reserva</option>
            <option>Sugestão</option>
            <option>Outro</option>
          </FormSelect>

          <FormTextArea 
            label="Mensagem" 
            id="mensagem"
            placeholder="Digite sua mensagem" 
          />

          <div className="text-center">
            <Button type="submit">
              Enviar Mensagem
            </Button>
          </div>

        </form>
      </div>
    </section>
  );
}