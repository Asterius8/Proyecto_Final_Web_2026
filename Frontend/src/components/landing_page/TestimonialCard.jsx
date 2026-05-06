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

export default TestimonialCard;