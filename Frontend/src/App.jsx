import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/landing_page/Navbar';
import Hero from './components/landing_page/Hero';
import Services from './components/landing_page/Services';
import About from "./components/landing_page/About";
import Testimonials from './components/landing_page/Testimonials';
import CTA from './components/landing_page/CTA';
import Footer from './components/landing_page/Footer';

import Register from "./components/Cuenta/Register";
import Ingresar from "./components/Cuenta/Ingresar";
import Dashboard from "./components/paciente/Dashboard";
import AdminDashboard from "./components/administrador/AdminDashboard";

import PatientForm from "./components/paciente/PatientForm";

import Error404 from "./components/errors/Error404";

import './styles/landing_page.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Services />
              <About />
              <Testimonials />
              <CTA />
              <Footer />
            </>
          }
        />

        {/* Registro */}
        <Route path="/register" element={<Register />} />
        {/* Registro de paciente */}
        <Route path="/paciente" element={<PatientForm />} />
        <Route path="/paciente/dashboard" element={<Dashboard />} />
        {/* Inicio de sesión */}
        <Route path="/login" element={<Ingresar />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;