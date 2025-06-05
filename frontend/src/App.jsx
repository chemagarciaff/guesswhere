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
import { MapaContext, MapaProvider } from './contextos/MapaContext';
import SelectorUbicacionGigante from "./components/MapaSelectorUbicacionGigante";
import VerResultado from "./components/VerResultado";
import StreetViewFav from "./components/MapaStreetViewFav";
import { useContext, useEffect } from "react";
import Verification from "./components/Verification";

function App() {

  useEffect(() => {
    getAvatares();
  }, []);

  const getAvatares = async () => {
    try {
      const response = await fetch('http://localhost:3000/guesswhere/usuario/todos');
      if (!response.ok) throw new Error('Error al cargar usuarios');

      const data = await response.json();

      const avataresObj = {};

      for (const usuario of data) {
        try {
          const avatarResponse = await fetch(`http://localhost:3000/guesswhere/usuario/avatar/${usuario.id_jugador}`);
          if (!avatarResponse.ok) throw new Error('Error al cargar avatar');

          const avatarJson = await avatarResponse.json();
          const byteArray = new Uint8Array(avatarJson.avatar.data);
          const blob = new Blob([byteArray], { type: 'image/png' });
          const url = URL.createObjectURL(blob);

          avataresObj[usuario.id_jugador] = url;
        } catch (error) {
          console.error(`Error avatar usuario ${usuario.id_jugador}:`, error);
          avataresObj[usuario.id_jugador] = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        }
      }
      console.log(avataresObj)

      // Guardamos en el contexto
      setAvatares(avataresObj);
    } catch (error) {
      console.error('Error general al cargar avatares:', error);
    }
  };
  const { setAvatares, avatares, ajustes } = useContext(MapaContext);


  return (
    <div className={`${ajustes.tipografia}`}>
      <BrowserRouter>
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
          <Route path="verificacion" element={
              <Verification />}
          />
          <Route path="verResultado" element={
            <PrivateRoute>
              <VerResultado />
            </PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;

