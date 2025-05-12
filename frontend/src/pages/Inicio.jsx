import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Galeria from '../components/galeria';
import Contacto from '../components/Contacto';
import Desarrolladores from '../components/Desarrolladores';
import PiePagina from '../components/PiePagina'
import QuiénesSomos from '../components/QuienesSomos';
function Inicio() {

  return (
    <div>
      <Navbar />
      <Galeria/>
      <QuiénesSomos/>
      <Desarrolladores/>
      <Contacto/>
      <PiePagina/>
    </div>
  );
}

export default Inicio;
