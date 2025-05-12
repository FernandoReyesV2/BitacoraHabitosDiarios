import React from 'react';

function QuiénesSomos() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 min-h-72" id="acerca-de-nosotros">
      <div className="grid grid-cols-2 items-center mb-16">
        <div className="flex justify-center border-r-2 border-gray-300">
          <img src="/libro.png" alt="Equipo" className="w-48" />
        </div>
        <div className="pl-6 text-center sm:text-left pr-6">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Quiénes Somos
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Aplicación diseñada para crear bitácoras diarias de forma simple, organizada y accesible.
          </p>
        </div>
      </div>
    </section>
  );
}

export default QuiénesSomos;
