import React, { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: ''
  });

  const [modalVisible, setModalVisible] = useState(false);

  const validateField = (name, value) => {
    let errorMessage = '';
    if (name === 'nombre' || name === 'apellido') {
      // Validar que no haya espacios en blanco
      if (/\s/.test(value)) {
        errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} no puede contener espacios.`;
      } else if (!/^[A-Za-záéíóúÁÉÍÓÚ]+$/.test(value)) {
        errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} solo puede contener letras.`;
      } else if (value.length < 3 || value.length > 20) {
        errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} debe tener entre 3 y 20 caracteres.`;
  }
    } else if (name === 'mensaje') {
      // Validar el mensaje (que sea entre 4 y 200 caracteres)
      if (!/^[A-Za-záéíóúÁÉÍÓÚ0-9 ]{4,200}$/.test(value)) {
        errorMessage = 'El mensaje debe contener entre 4 y 200 caracteres alfanuméricos.';
      }
    } else if (name === 'email') {
      // Validar correo electrónico
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Correo electrónico no válido.';
      }
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convertir a mayúsculas los campos de nombre, apellido y mensaje
    if (name === 'nombre' || name === 'apellido') {
      setFormData({ ...formData, [name]: value.replace(/\s/g, '').toUpperCase() });
    } else if (name === 'mensaje') {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Validación en tiempo real
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificamos que todos los campos sean válidos antes de enviar el formulario
    const nombreError = validateField('nombre', formData.nombre);
    const apellidoError = validateField('apellido', formData.apellido);
    const mensajeError = validateField('mensaje', formData.mensaje);
    const emailError = validateField('email', formData.email);

    if (nombreError || apellidoError || mensajeError || emailError) {
      alert('Por favor corrige los errores antes de enviar.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // alert('Mensaje enviado correctamente');
        setFormData({ nombre: '', apellido: '', email: '', mensaje: '' });
        setModalVisible(true);
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red al enviar el mensaje');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="bg-white py-16 px-4" id="contacto">
        <div className="bg-gray-50 shadow-lg rounded-lg max-w-3xl mx-auto px-6 py-12 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg]
                         bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30
                         sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }}
            ></div>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contáctanos</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              ¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    autoComplete="given-name"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 
                               shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.nombre && <p className="text-red-600 text-xs">{errors.nombre}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-semibold leading-6 text-gray-900">
                  Apellido
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="apellido"
                    id="apellido"
                    autoComplete="family-name"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 
                               shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.apellido && <p className="text-red-600 text-xs">{errors.apellido}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Correo electrónico
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 
                               shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="block text-sm font-semibold leading-6 text-gray-900">
                  Mensaje
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="mensaje"
                    id="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 
                               shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ resize: 'none' }} // Evitar redimensionar el textarea
                  ></textarea>
                  {errors.mensaje && <p className="text-red-600 text-xs">{errors.mensaje}</p>}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm 
                           font-semibold text-white shadow-sm hover:bg-indigo-500 
                           focus-visible:outline focus-visible:outline-2 
                           focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
      {modalVisible && (
      <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 class="text-xl font-semibold text-green-600">¡Mensaje enviado con éxito!</h2>
          <p class="mt-2 text-gray-600">Hemos recibido tu mensaje y te responderemos pronto.</p>
          <button
            onClick={closeModal}
            class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Cerrar
          </button>
        </div>
      </div>
       )}
    </>
  );
}

export default Contacto;
