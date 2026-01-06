import Galeria from '@/components/galeria'

export default function AtivosPage() {
  return (
    <>
      <h1>Galeria de Ativos Disponíveis</h1>

      <div className="grid grid-cols-auto-fill gap-8 px-8 max-w-screen-xl mx-auto">
        <Galeria />
      </div>
    </>
  )
}
