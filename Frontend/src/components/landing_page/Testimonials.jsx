import TestimonialCard from "./TestimonialCard";

function Testimonials() {

  const testimonios = [
    {
      inicial: "M",
      nombre: "María González",
      especialidad: "Paciente de Cardiología",
      texto: "Excelente atención por parte de todo el personal. Me sentí muy bien cuidada durante todo mi tratamiento. Los recomiendo ampliamente."
    },
    {
      inicial: "C",
      nombre: "Carlos Rodríguez",
      especialidad: "Padre de pacientes",
      texto: "Llevo a mis hijos aquí desde que nacieron. Los pediatras son excelentes y siempre están disponibles para resolver nuestras dudas."
    },
    {
      inicial: "A",
      nombre: "Ana Martínez",
      especialidad: "Paciente de Psicología",
      texto: "La atención psicológica que recibí aquí cambió mi vida. Los profesionales son muy empáticos y el ambiente es muy acogedor."
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