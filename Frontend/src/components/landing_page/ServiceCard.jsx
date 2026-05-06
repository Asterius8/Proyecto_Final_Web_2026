function ServiceCard({ icono, titulo, descripcion }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icono}</div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default ServiceCard;