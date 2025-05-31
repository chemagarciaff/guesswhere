import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import './style/general.css';
import Login from "./components/Login";
import PantallaAjustes from './components/PantallaAjustes';
import PantallaAmigos from "./components/PantallaAmigos";
import PantallaInicio from './components/PantallaInicio';
import PantallaJuego from './components/PantallaJuego';
import PantallaPerfil from "./components/PantallaPerfil";
import PantallaRanking from "./components/PantallaRanking";
import PantallaResultado from './components/PantallaResultado';
import Register from "./components/Register";
import PantallaConfiguracionPartida from "./components/PantallaConfiguracionPartida";
import PrivateRoute from './components/PrivateRoutes';
import { MapaProvider } from './contextos/MapaContext';
import SelectorUbicacionGigante from "./components/MapaSelectorUbicacionGigante";
import VerResultado from "./components/VerResultado";
import StreetViewFav from "./components/MapaStreetViewFav";

function App() {
  return (
    <BrowserRouter>
      <MapaProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="inicio" element={
            <PrivateRoute>
              <PantallaInicio />
            </PrivateRoute>} />
          <Route path="configuracion" element={
            <PrivateRoute>
              <PantallaConfiguracionPartida />
            </PrivateRoute>}
          />
          <Route path="selector" element={
            <PrivateRoute>
              <SelectorUbicacionGigante />
            </PrivateRoute>}
          />
          <Route path="partida" element={
            <PrivateRoute>
              <PantallaJuego />
            </PrivateRoute>}
          />

          <Route path="ranking" element={
            <PrivateRoute>
              <PantallaRanking />
            </PrivateRoute>}
          />
          <Route path="amigos" element={
            <PrivateRoute>
              <PantallaAmigos />
            </PrivateRoute>}
          />
          <Route path="perfil" element={
            <PrivateRoute>
              <PantallaPerfil />
            </PrivateRoute>}
          />
          <Route path="ajustes" element={
            <PrivateRoute><PantallaAjustes />
            </PrivateRoute>}
          />
          <Route path="resultado" element={
            <PrivateRoute>
              <PantallaResultado />
            </PrivateRoute>}
          />
          <Route path="verFavorito" element={
            <PrivateRoute>
              <StreetViewFav />
            </PrivateRoute>}
          />
          <Route path="verResultado" element={
            <PrivateRoute>
              <VerResultado />
            </PrivateRoute>}
          />
        </Routes>
      </MapaProvider>
    </BrowserRouter>

  );
}

export default App;

