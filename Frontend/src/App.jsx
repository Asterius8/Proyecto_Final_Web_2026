// Importamos los componentes de cada página
import LandingPage  from "../src/components/landing_page";
import CrearCuenta  from "../src/components/crear_cuenta";

// Componente raíz de la aplicación
// Usamos window.location.pathname para navegar entre páginas
// sin necesitar instalar React Router todavía
function App() {

  // Leemos la ruta actual del navegador
  // Ejemplos: "/" = landing, "/register" = crear cuenta
  const ruta = window.location.pathname;

  // Mostramos la página según la ruta actual
  if (ruta === "/register") return <CrearCuenta />;

  // Por defecto mostramos la landing page
  return <LandingPage />;
}

// Exportamos App como componente por defecto
export default App;