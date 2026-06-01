export function sesionExpirada() {
  const loginTime = localStorage.getItem("loginTime");

  const tiempoMaximo = 60 * 60 * 1000; // cambia aquí el tiempo

  if (!loginTime) return true;

  return Date.now() - Number(loginTime) > tiempoMaximo;
}

export function cerrarSesion() {
  localStorage.removeItem("email");
  localStorage.removeItem("rol");
  localStorage.removeItem("loginTime");
  localStorage.removeItem("seccionActiva");
  localStorage.removeItem("seccionAdmin");
}