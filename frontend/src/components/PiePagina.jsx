import React from 'react';

function PiePagina() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Sobre Nosotros</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Quiénes somos</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Nuestro equipo</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Proyectos</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Centro de ayuda</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Soporte</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Contacto</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Preguntas frecuentes</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Guías</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Política de privacidad</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Términos y condiciones</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Aviso legal</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Síguenos</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Facebook</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Twitter</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Instagram</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">YouTube</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
          © {new Date().getFullYear()} <strong className="text-gray-900 dark:text-white">TúBitácora™</strong>. Todos los derechos reservados.
        </span>
        <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
          <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default PiePagina;
