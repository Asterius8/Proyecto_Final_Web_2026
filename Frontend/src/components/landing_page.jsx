// Datos de servicios definidos directamente en este archivo
// (evita problemas de rutas relativas según donde esté el componente)
const servicios = [
  { icono: "👨‍⚕️", titulo: "Consulta General",  descripcion: "Atención médica integral para pacientes de todas las edades, con diagnóstico y tratamiento personalizado." },
  { icono: "👶",    titulo: "Pediatría",          descripcion: "Cuidado especializado para los más pequeños, desde recién nacidos hasta adolescentes." },
  { icono: "❤️",   titulo: "Cardiología",         descripcion: "Evaluación y tratamiento de enfermedades cardiovasculares con tecnología de vanguardia." },
  { icono: "🦷",   titulo: "Odontología",         descripcion: "Salud bucodental completa con enfoque preventivo y tratamientos especializados." },
  { icono: "🧠",   titulo: "Psicología",          descripcion: "Atención psicológica para el bienestar emocional y mental de nuestros pacientes." },
  { icono: "🔬",   titulo: "Laboratorio Clínico", descripcion: "Análisis y estudios de laboratorio con resultados precisos y confiables." },
];

// Datos de testimonios definidos directamente en este archivo
const testimonios = [
  { inicial: "M", nombre: "María González",   especialidad: "Paciente de Cardiología", texto: "Excelente atención por parte de todo el personal. Me sentí muy bien cuidada durante todo mi tratamiento." },
  { inicial: "C", nombre: "Carlos Rodríguez", especialidad: "Padre de pacientes",      texto: "Llevo a mis hijos aquí desde que nacieron. Los pediatras son excelentes y siempre están disponibles." },
  { inicial: "A", nombre: "Ana Martínez",     especialidad: "Paciente de Psicología",  texto: "La atención psicológica que recibí aquí cambió mi vida. Los profesionales son muy empáticos." },
];

// ── Subcomponente: tarjeta de servicio ────────────────────────
// Recibe icono, titulo y descripcion como props
function ServiceCard({ icono, titulo, descripcion }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icono}</div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <a href="#" className="btn btn-outline" style={{ marginTop: "15px" }}>
        Más información
      </a>
    </div>
  );
}

// ── Subcomponente: tarjeta de testimonio ──────────────────────
function TestimonialCard({ inicial, nombre, especialidad, texto }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-text">"{texto}"</div>
      <div className="testimonial-author">
        <div className="author-avatar">{inicial}</div>
        <div className="author-info">
          <h4>{nombre}</h4>
          <p>{especialidad}</p>
        </div>
      </div>
    </div>
  );
}

// ── Página principal: LandingPage ─────────────────────────────
function LandingPage() {
  // Función para scroll suave a secciones internas
  function scrollTo(e, id) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Header fijo */}
      <header>
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--primary-color)" }}>
                Clínica del Bienestar
              </span>
            </div>
            <ul className="nav-links">
              <li><a href="#inicio"      onClick={(e) => scrollTo(e, "inicio")}>Inicio</a></li>
              <li><a href="#servicios"   onClick={(e) => scrollTo(e, "servicios")}>Servicios</a></li>
              <li><a href="#nosotros"    onClick={(e) => scrollTo(e, "nosotros")}>Nosotros</a></li>
              <li><a href="#testimonios" onClick={(e) => scrollTo(e, "testimonios")}>Testimonios</a></li>
              <li><a href="#contacto"    onClick={(e) => scrollTo(e, "contacto")}>Contacto</a></li>
              {/* Usamos href de React Router para navegar al login/register */}
              <li><a href="/login"    className="btn btn-primary">Iniciar Sesión</a></li>
              <li><a href="/register" className="btn btn-primary">Registrarse</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <h1>Clínica del Bienestar</h1>
            <p>Cuidamos de tu salud integral con un enfoque humano y profesional.</p>
            <a href="#" className="btn btn-primary">Solicitar Cita</a>
            <a href="#servicios" className="btn btn-outline" onClick={(e) => scrollTo(e, "servicios")}>Conocer Servicios</a>
          </div>
        </div>
      </section>

      {/* Servicios: renderizados desde el array de datos */}
      <section className="services" id="servicios">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Servicios</h2>
            <p>Ofrecemos una amplia gama de servicios médicos para cuidar de tu salud en todas las etapas de la vida.</p>
          </div>
          
          <div className="services-grid">
            {servicios.map((s, i) => (
              <ServiceCard key={i} icono={s.icono} titulo={s.titulo} descripcion={s.descripcion} />
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section className="about" id="nosotros">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Sobre Nosotros</h2>
              <p>En Clínica del Bienestar nos dedicamos a proporcionar atención médica de calidad con un enfoque integral y humano.</p>
              <p>Fundada en 2005, nuestra clínica ha crecido para convertirse en un referente de excelencia médica en la región.</p>
              <p>Creemos que la salud va más allá de la ausencia de enfermedad, promoviendo estilos de vida saludables.</p>
              <a href="#" className="btn btn-primary">Conoce Nuestro Equipo</a>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Equipo médico"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios: renderizados desde el array de datos */}
      <section className="testimonials" id="testimonios">
        <div className="container">
          <div className="section-title">
            <h2>Testimonios de Pacientes</h2>
            <p>Conoce las experiencias de quienes han confiado en nosotros.</p>
          </div>
          <div className="testimonials-grid">
            {testimonios.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>¿Listo para cuidar de tu salud?</h2>
          <p>Agenda una cita con nuestros especialistas y da el primer paso hacia tu bienestar integral.</p>
          <a href="#" className="btn btn-outline">Solicitar Cita</a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>Clínica del Bienestar</h3>
              <p>Tu salud es nuestra prioridad.</p>
            </div>
            <div className="footer-column">
              <h3>Enlaces Rápidos</h3>
              <ul className="footer-links">
                <li><a href="#inicio"      onClick={(e) => scrollTo(e, "inicio")}>Inicio</a></li>
                <li><a href="#servicios"   onClick={(e) => scrollTo(e, "servicios")}>Servicios</a></li>
                <li><a href="#nosotros"    onClick={(e) => scrollTo(e, "nosotros")}>Nosotros</a></li>
                <li><a href="#testimonios" onClick={(e) => scrollTo(e, "testimonios")}>Testimonios</a></li>
                <li><a href="#contacto"    onClick={(e) => scrollTo(e, "contacto")}>Contacto</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Servicios</h3>
              <ul className="footer-links">
                <li><a href="#">Consulta General</a></li>
                <li><a href="#">Pediatría</a></li>
                <li><a href="#">Cardiología</a></li>
                <li><a href="#">Odontología</a></li>
                <li><a href="#">Psicología</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contacto</h3>
              <ul className="footer-links">
                <li>📍 Calle Labradores, Col. Frente Popular Sur</li>
                <li>📞 4941003247</li>
                <li>✉️ info@clinicadelbienestar.com</li>
                <li>🕒 Lun-Vie: 8:00 - 18:00</li>
                <li>🕒 Sáb: 9:00 - 13:00</li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Clínica del Bienestar. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;