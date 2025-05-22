import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import PantallaAjustes from './components/PantallaAjustes';
import PantallaAmigos from "./components/PantallaAmigos";
import PantallaInicio from './components/PantallaInicio';
import PantallaJuego from './components/PantallaJuego';
import PantallaPerfil from "./components/PantallaPerfil";
import PantallaRanking from "./components/PantallaRanking";
import PantallaResultado from './components/PantallaResultado';
import Register from "./components/Register";
import { MapaProvider } from './contextos/MapaContext';
import PantallaConfiguracionPartida from "./components/PantallaConfiguracionPartida";

function App() {
  return (
    <BrowserRouter>
      <MapaProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="inicio" element={<PantallaInicio />} />
          <Route path="configuracion" element={<PantallaConfiguracionPartida />} />
          <Route path="partida" element={<PantallaJuego />} />
          <Route path="ranking" element={<PantallaRanking />} />
          <Route path="amigos" element={<PantallaAmigos />} />
          <Route path="perfil" element={<PantallaPerfil />} />
          <Route path="ajustes" element={<PantallaAjustes />} />
          <Route path="resultado" element={<PantallaResultado />} />
        </Routes>
      </MapaProvider>
    </BrowserRouter>

  );
}

export default App;

