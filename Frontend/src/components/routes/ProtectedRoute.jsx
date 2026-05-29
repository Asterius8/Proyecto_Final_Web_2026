import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const email = localStorage.getItem("email");
  const loginTime = localStorage.getItem("loginTime");

  // 30 minutos     minutos * segundos * milisegundos
  const tiempoMaximo = 2 * 60 * 1000;

  if (!email || !loginTime) {
    return <Navigate to="/login" replace />;
  }

  const tiempoActual = Date.now();
  const tiempoTranscurrido = tiempoActual - Number(loginTime);

  if (tiempoTranscurrido > tiempoMaximo) {
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("seccionActiva");

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;