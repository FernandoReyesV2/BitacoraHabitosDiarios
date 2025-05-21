import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Galeria from '../components/galeria';
import Contacto from '../components/Contacto';
import Desarrolladores from '../components/Desarrolladores';
import PiePagina from '../components/PiePagina'
import QuiénesSomos from '../components/QuienesSomos';
function Inicio() {
    useEffect(() => {
    const sectionId = localStorage.getItem('scrollToSection');
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      localStorage.removeItem('scrollToSection');
    }
  }, []);

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
