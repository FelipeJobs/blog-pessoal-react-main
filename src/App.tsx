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

/*  */
function App() {
  return (
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
         
          {/*  */}
        </Routes>
      </div>
      <Footer />
    </Router>
    /* element eu coloco a função e no path o caminho. */
  );
}

export default App;
