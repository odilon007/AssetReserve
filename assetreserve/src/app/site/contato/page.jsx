'use client'

import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextArea } from "@/components/form/FormTextArea";
import { Button } from "@/components/form/Button";

export default function Contato() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário enviado");
  };
  
  return (
    // Ajuste: py-8 (mobile) -> md:py-16 (desktop)
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 md:py-16">
      
      {/* Ajuste: p-6 (mobile) -> md:p-8 (desktop) */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        
        {/* Ajuste: mb-6 (mobile) -> md:mb-8 (desktop) */}
        <header className="mb-6 md:mb-8 text-center">
          {/* Ajuste: text-2xl (mobile) -> md:text-3xl (desktop) */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B2545] mb-2">
            Fale Conosco
          </h2>
          {/* Ajuste: text-sm (mobile) -> text-base (padrão desktop) */}
          <p className="text-sm md:text-base text-gray-600">
            Tem alguma dúvida, sugestão ou problema com reservas? Entre em contato com a equipe do AssetReserve.
          </p>
        </header>

        {/* Ajuste: space-y-4 (mobile) -> md:space-y-6 (desktop) */}
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          
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

          <div className="text-center pt-2">
            <Button type="submit">
              Enviar Mensagem
            </Button>
          </div>

        </form>
      </div>
    </section>
  );
}