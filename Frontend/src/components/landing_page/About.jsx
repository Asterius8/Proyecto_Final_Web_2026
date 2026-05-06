function About() {
  return (
    <section className="about" id="nosotros">
      <div className="container">
        <div className="about-content">

          <div className="about-text">
            <h2>Sobre Nosotros</h2>
            <p>
              En Clínica del Bienestar nos dedicamos a proporcionar atención médica de calidad
              con un enfoque integral y humano.
            </p>
            <p>
              Fundada en 2005, nuestra clínica ha crecido hasta convertirse en un referente
              de excelencia médica en la región.
            </p>
            <p>
              Creemos que la salud va más allá de la ausencia de enfermedad,
              promoviendo estilos de vida saludables.
            </p>

            <a href="#" className="btn btn-primary">
              Conoce Nuestro Equipo
            </a>
          </div>

          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1350&q=80"
              alt="Equipo médico"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;