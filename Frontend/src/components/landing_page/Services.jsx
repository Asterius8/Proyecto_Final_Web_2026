import ServiceCard from "./ServiceCard";

function Services() {

  const servicios = [
    { icono: "👨‍⚕️", titulo: "Consulta General", descripcion: "Atención médica integral para pacientes de todas las edades." },
    { icono: "👶", titulo: "Pediatría", descripcion: "Cuidado especializado para niños." },
    { icono: "❤️", titulo: "Cardiología", descripcion: "Tratamiento cardiovascular." },
    { icono: "🦷", titulo: "Odontología", descripcion: "Salud dental completa." },
    { icono: "🧠", titulo: "Psicología", descripcion: "Bienestar emocional." },
    { icono: "🔬", titulo: "Laboratorio", descripcion: "Análisis clínicos precisos." },
  ];

  return (
    <section className="services" id="servicios">
      <div className="container">

        <div className="section-title">
          <h2>Nuestros Servicios</h2>
          <p>Ofrecemos atención médica integral para todos.</p>
        </div>

        <div className="services-grid">
          {servicios.map((servicio, index) => (
            <ServiceCard
              key={index}
              icono={servicio.icono}
              titulo={servicio.titulo}
              descripcion={servicio.descripcion}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;