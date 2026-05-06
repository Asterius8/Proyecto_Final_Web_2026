function Footer() {
  return (
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
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#testimonios">Testimonios</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Servicios</h3>
            <ul className="footer-links">
              <li>Consulta General</li>
              <li>Pediatría</li>
              <li>Cardiología</li>
              <li>Odontología</li>
              <li>Psicología</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contacto</h3>
            <ul className="footer-links">
              <li>📍 Fresnillo, Zacatecas</li>
              <li>📞 4941003247</li>
              <li>✉️ info@clinicadelbienestar.com</li>
            </ul>
          </div>

        </div>

        <div className="copyright">
          <p>&copy; 2025 Clínica del Bienestar</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;