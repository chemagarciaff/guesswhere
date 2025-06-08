import { useEffect, useState } from "react";

export default function FormUbicacion() {
  const [form, setForm] = useState({
    pais: "",
    continente: "",
    latitud: null,
    longitud: null,
    observaciones: "",
  });
  const [categoriasForm, setCategoriasForm] = useState([])

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/guesswhere/categoria/todas")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Error al obtener categorías:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

const handleCheckboxChange = (id_categoria) => {
  setCategoriasForm(prev => {
    if (prev.includes(id_categoria)) {
      // Si ya está, lo quitamos
      return prev.filter(id => id !== id_categoria);
    } else {
      // Si no está, lo agregamos
      return [...prev, id_categoria];
    }
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ubicacionRes = await fetch("http://localhost:3000/guesswhere/ubicacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!ubicacionRes.ok) {
      alert("Error al crear ubicación");
      return;
    }

    const nuevaUbicacion = await ubicacionRes.json();

    // Asociar categorías a la ubicación
    if (categoriasForm.length > 0) {
      await Promise.all(
        categoriasForm.map((id_categoria) =>
          fetch("http://localhost:3000/guesswhere/pertenece", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_categoria,
              id_ubicacion: nuevaUbicacion.id_ubicacion,
            }),
          })
        )
      );
    }

    alert("Ubicación creada correctamente");
    setForm({
      pais: "",
      continente: "",
      latitud: null,
      longitud: null,
      observaciones: "",
    });
    setCategoriasForm([])
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto px-4 lg:px-8 xl:px-20 rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-white">Crear Ubicación</h2>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4">
        <input
          name="pais"
          placeholder="País"
          value={form.pais}
          onChange={handleChange}
          required
          className="input-field p-2 rounded"
        />
        <input
          name="latitud"
          placeholder="Latitud"
          value={form.latitud}
          onChange={handleChange}
          required
          className="input-field p-2 rounded"
        />
        <input
          name="continente"
          placeholder="Continente"
          value={form.continente}
          onChange={handleChange}
          required
          className="input-field p-2 rounded"
        />
        <input
          name="longitud"
          placeholder="Longitud"
          value={form.longitud}
          onChange={handleChange}
          required
          className="input-field p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={form.observaciones}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <fieldset className="border border-gray-300 rounded-lg p-4">
        <legend className="text-lg font-medium text-gray-700 mb-2">Categorías</legend>
        <div className="grid grid-cols-2 gap-2">
          {categorias.map(cat => (
            <label key={cat.id_categoria} className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                checked={categoriasForm.includes(cat.id_categoria)}
                onChange={() => handleCheckboxChange(cat.id_categoria)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-white">{cat.nombre}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full  text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 fondo-arcoiris border-none transition duration-300"
      >
        Crear Ubicación
      </button>
    </form>

  );
}
