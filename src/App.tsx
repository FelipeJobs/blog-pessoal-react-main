import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/static/navbar/Navbar";
import Footer from "./components/static/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "./App.css";
import CadastroUsuario from "./pages/cadastroUsuario/CadastroUsuario";
import ListaTema from "./components/Temas/LIstaTema/ListaTema";
import ListaPostagem from "./components/Postagem/ListaPostagem/ListaPostagem";
import CadastrarPostagem from "./components/Postagem/CadastrarPostagem/CadastrarPostagem";
import CadastroTema from "./components/Temas/CadastrarTema/CadastroTema";
import DeletarPostagem from "./components/Postagem/DeletarPostagem/DeletarPostagem";
import DeletarTema from "./components/Temas/DeletarTema/DeletarTema";
import { Provider } from "react-redux";
import store from "./store/store";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*  */
function App() {
  return (
    /* graça ao provider todas as rotas podem acessar o store */
    <Provider store={store}>
    <ToastContainer/>
    <Router> {/* basicamente ele é usado para informar algo que será renderizado em todas as silas, neste caso seria o navbar e o footer(menus e rodapé) (BrowserRouter)  */}
      <div style={{minHeight: '100vh' }}>
      <Navbar />
        <Routes> {/*identifica que rota foi acessada e qual componentente deve ser renderizado na tela do usuário.  */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<CadastroUsuario />} />
          <Route path = '/Temas' element = {<ListaTema/>}/>
          <Route path = '/Postagens' element = {<ListaPostagem/>}/>
          <Route path="/formularioPostagem" element={<CadastrarPostagem />} />

          <Route path="/formularioPostagem/:id" element={<CadastrarPostagem />} />

          <Route path="/formularioTema" element={<CadastroTema />} />

          <Route path="/formularioTema/:id" element={<CadastroTema />} />

          <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />

          <Route path="/deletarTema/:id" element={<DeletarTema />} />
         
         
        </Routes>
      </div>
      <Footer />
    </Router>
    </Provider>
    /* element eu coloco a função e no path o caminho. */
  );
}

export default App;
