import TestimonialCard from "./TestimonialCard";

function Testimonials() {

  const testimonios = [
    {
      inicial: "M",
      nombre: "María González",
      especialidad: "Paciente de Cardiología",
      texto: "Excelente atención, me sentí muy bien cuidada."
    },
    {
      inicial: "C",
      nombre: "Carlos Rodríguez",
      especialidad: "Padre de pacientes",
      texto: "Los pediatras son excelentes y muy atentos."
    },
    {
      inicial: "A",
      nombre: "Ana Martínez",
      especialidad: "Paciente de Psicología",
      texto: "La atención psicológica cambió mi vida."
    }
  ];

  return (
    <section className="testimonials" id="testimonios">
      <div className="container">

        <div className="section-title">
          <h2>Testimonios de Pacientes</h2>
          <p>Conoce las experiencias de quienes han confiado en nosotros.</p>
        </div>

        <div className="testimonials-grid">
          {testimonios.map((t, index) => (
            <TestimonialCard key={index} {...t} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;