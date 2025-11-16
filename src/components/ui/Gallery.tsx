const IMAGES = [
  {
    src:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    alt: 'Código em laptop com iluminação moderna',
  },
  {
    src:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Ambiente de trabalho com tela de código',
  },
  {
    src:
      'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80',
    alt: 'Equipe colaborando em design e tecnologia',
  },
  {
    src:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Protótipos de interface e UX',
  },
  {
    src:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    alt: 'Geometria 3D com luzes neon',
  },
  {
    src:
      'https://images.unsplash.com/photo-1611162618071-b39f0fb83f3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Formas abstratas coloridas com profundidade',
  },
]

export default function Gallery() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Galeria moderna</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Imagens selecionadas para transmitir tecnologia, sofisticação e uma estética contemporânea.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {IMAGES.map((img, i) => (
            <figure key={i} className="group overflow-hidden rounded-xl bg-gray-100 shadow-sm ring-1 ring-gray-900/10">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="px-4 py-3 text-sm text-gray-700">{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}