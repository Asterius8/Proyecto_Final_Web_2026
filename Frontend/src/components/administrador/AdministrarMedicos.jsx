import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../styles/administrar_medicos.css";

function AdministrarMedicos() {
    const [medicos, setMedicos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [form, setForm] = useState({
        id: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        especialidad: "",
    });

    useEffect(() => {
        obtenerMedicos();
    }, []);

    const obtenerMedicos = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/medicos`);
            const data = await res.json();

            if (data.ok) {
                setMedicos(data.medicos);
            } else {
                Swal.fire("Error", "No se pudieron cargar los médicos", "error");
            }
        } catch {
            Swal.fire("Error", "No se pudo conectar al servidor", "error");
        }
    };

    const abrirModal = (medico) => {
        setForm({
            id: medico.Id_Medicos,
            nombre: medico.Nombre,
            apellido_paterno: medico.Apellido_Paterno,
            apellido_materno: medico.Apellido_Materno,
            especialidad: medico.Especialidad,
        });

        setMostrarModal(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validar = () => {
        const errores = [];
        const soloLetras = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/;

        if (!form.nombre.trim()) errores.push("El nombre es obligatorio");
        else if (!soloLetras.test(form.nombre)) errores.push("El nombre solo puede contener letras");

        if (!form.apellido_paterno.trim()) errores.push("El apellido paterno es obligatorio");
        else if (!soloLetras.test(form.apellido_paterno)) errores.push("El apellido paterno solo puede contener letras");

        if (!form.apellido_materno.trim()) errores.push("El apellido materno es obligatorio");
        else if (!soloLetras.test(form.apellido_materno)) errores.push("El apellido materno solo puede contener letras");

        if (!form.especialidad) errores.push("Debe seleccionar una especialidad");

        return errores;
    };

    const editarMedico = async (e) => {
        e.preventDefault();

        const errores = validar();

        if (errores.length > 0) {
            Swal.fire({
                title: "Errores encontrados",
                html: `<ul style="text-align:left;">${errores.map(err => `<li>${err}</li>`).join("")}</ul>`,
                icon: "error",
            });
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/medicos/${form.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.ok) {
                Swal.fire("Médico modificado", "La información fue actualizada", "success");
                setMostrarModal(false);
                obtenerMedicos();
            } else {
                Swal.fire("Error", data.errores?.[0] || "No se pudo editar", "error");
            }
        } catch {
            Swal.fire("Error", "No se pudo conectar al servidor", "error");
        }
    };

    const eliminarMedico = async (medico) => {
        const result = await Swal.fire({
            title: "¿Eliminar médico?",
            text: `Se eliminará a ${medico.Nombre} ${medico.Apellido_Paterno}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#e74c3c",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/medicos/${medico.Id_Medicos}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.ok) {
                Swal.fire("Eliminado", "El médico fue eliminado correctamente", "success");
                obtenerMedicos();
            } else {
                Swal.fire("Error", data.errores?.[0] || "No se pudo eliminar", "error");
            }
        } catch {
            Swal.fire("Error", "No se pudo conectar al servidor", "error");
        }
    };

    return (
        <div className="admin-medicos-page">
            <div className="header">
                <h1>Nuestros Médicos</h1>
                <p>Gestiona el equipo médico especializado de la Clínica del Bienestar</p>
            </div>

            <div className="medicos-container">
                <div className="table-responsive">
                    <table className="medicos-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Especialidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {medicos.map((medico) => (
                                <tr key={medico.Id_Medicos}>
                                    <td>{medico.Nombre}</td>
                                    <td>{medico.Apellido_Paterno}</td>
                                    <td>{medico.Apellido_Materno}</td>
                                    <td>{medico.Especialidad}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-edit" onClick={() => abrirModal(medico)}>
                                                Editar
                                            </button>

                                            <button className="btn btn-danger" onClick={() => eliminarMedico(medico)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {mostrarModal && (
                <div className="modal-admin-medico">
                    <div className="admin-modal-content">
                        <div className="admin-modal-header">
                            <h3>Editar Médico</h3>
                            <button className="close-modal" onClick={() => setMostrarModal(false)}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={editarMedico}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label>Nombre</label>
                                    <input name="nombre" value={form.nombre} onChange={handleChange} />
                                </div>

                                <div className="admin-form-group">
                                    <label>Apellido Paterno</label>
                                    <input name="apellido_paterno" value={form.apellido_paterno} onChange={handleChange} />
                                </div>

                                <div className="admin-form-group">
                                    <label>Apellido Materno</label>
                                    <input name="apellido_materno" value={form.apellido_materno} onChange={handleChange} />
                                </div>

                                <div className="admin-form-group">
                                    <label>Especialidad</label>
                                    <select name="especialidad" value={form.especialidad} onChange={handleChange}>
                                        <option value="">Seleccione una especialidad</option>
                                        <option value="Pediatra">Pediatra</option>
                                        <option value="Cirujano">Cirujano</option>
                                        <option value="Internista">Internista</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                            </div>

                           <div className="admin-modal-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setMostrarModal(false)}>
                                    Cancelar
                                </button>

                                <button type="submit" className="btn btn-primary">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdministrarMedicos;