import ServiceCard from "./ServiceCard";

function Services() {

  const servicios = [
    { icono: "👨‍⚕️", titulo: "Consulta General", descripcion: "Atención médica integral para pacientes de todas las edades, con diagnóstico y tratamiento personalizado." },
    { icono: "👶", titulo: "Pediatría", descripcion: "Cuidado especializado para los más pequeños, desde recién nacidos hasta adolescentes." },
    { icono: "❤️", titulo: "Cardiología", descripcion: "Evaluación y tratamiento de enfermedades cardiovasculares con tecnología de vanguardia." },
    { icono: "🦷", titulo: "Odontología", descripcion: "Salud bucodental completa con enfoque preventivo y tratamientos especializados." },
    { icono: "🧠", titulo: "Psicología", descripcion: "Atención psicológica para el bienestar emocional y mental de nuestros pacientes." },
    { icono: "🔬", titulo: "Laboratorio", descripcion: "Análisis y estudios de laboratorio con resultados precisos y confiables." },
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