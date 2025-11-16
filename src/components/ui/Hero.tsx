export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:gap-10 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Experiência moderna e visual atrativo
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Um layout elegante com imagens profissionais para transmitir confiança e
            destacar sua presença digital. Responsivo, acessível e com performance.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Fale conosco
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Ver portfólio <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 lg:flex-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm ring-1 ring-gray-900/10">
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80"
              alt="Imagem herói moderna com ambiente de trabalho minimalista"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 transform-gpu overflow-hidden blur-3xl">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21rem] max-w-none"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#grad)"
            fillOpacity=".3"
            d="M317.563 285.998L203.5 0l949.5 678-677.5-101.5L317.563 285.998z"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}