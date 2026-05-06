import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/landing_page/Navbar';
import Hero from './components/landing_page/Hero';
import Services from './components/landing_page/Services';
import About from "./components/landing_page/About";
import Testimonials from './components/landing_page/Testimonials';
import CTA from './components/landing_page/CTA';
import Footer from './components/landing_page/Footer';

import Register from "./components/auth/Register";
import PatientForm from "./components/patient/PatientForm";

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
      </Routes>
    </BrowserRouter>
  );
}
export default App;