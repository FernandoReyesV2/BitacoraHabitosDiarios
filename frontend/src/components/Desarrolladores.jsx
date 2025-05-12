const people = [
  {
    name: 'Fernando Reyes',
    role: 'Desarrollador de la aplicación',
    imageUrl: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
  },
  {
    name: 'Edith Ríos',
    role: 'Desarrolladora de la aplicación',
    imageUrl: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
  },
];

export default function Desarrolladores() {
  return (
    <div className="bg-white">
      {/* Sección de introducción con imagen y texto */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-4">
        <div className="grid grid-cols-2 items-center mb-16">
          <div className="pl-6 text-center sm:text-left pr-6">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Conoce a nuestro equipo
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Somos un equipo comprometido con el desarrollo de soluciones digitales que faciliten la creación de bitácoras diarias de forma sencilla, accesible y eficiente.
            </p>
          </div>
          <div className="flex justify-center  border-l-2 border-gray-300">
            <img src="/developer.png" alt="Equipo" className="w-48" />
          </div>
        </div>

        {/* Cards de los desarrolladores */}
        <ul role="list" className="grid gap-8 sm:grid-cols-2">
          {people.map((person) => (
            <li
              key={person.name}
              className="bg-gray-50 p-6 rounded-xl shadow-md flex items-center gap-x-6 hover:shadow-lg transition"
            >
              <img
                alt={person.name}
                src={person.imageUrl}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-sm font-medium text-indigo-600">
                  {person.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
