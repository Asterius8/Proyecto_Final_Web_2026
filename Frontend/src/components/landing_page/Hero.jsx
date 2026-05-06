function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-content">
          <h1>Clínica del Bienestar</h1>
          <p>
            Cuidamos de tu salud integral con un enfoque humano y profesional.
            Nuestro equipo de especialistas está comprometido con tu bienestar.
          </p>

          <button className="btn btn-primary">
            Solicitar Cita
          </button>

          <button className="btn btn-outline" style={{ marginLeft: "10px" }}>
            Conocer Servicios
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;