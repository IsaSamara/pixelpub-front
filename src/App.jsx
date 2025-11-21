// src/App.jsx

//IMPORTAÇÕES BÁSICAS----------------------------------------------------
import React from "react"; //importa o react

//IMPORTAÇÕES DE ROTEAMENTO----------------------------------------------
import { Routes, Route } from 'react-router-dom' //importa as ferramentas do React Router DOM (Routes: container que engloba todas as rotas da aplicação e Route: define o caminho (URL) e qual componente que deve ser exibido)

//IMPORTAÇÃO DOS COMPONENTES DE LAYOUT (components)-----------------------------------
import Navbar from "./components/Navbar" //"Header"
import Sidebar from './components/Sidebar' //barra lateral com ícones

//IMPORTAÇÃO DOS COMPONENTES PRINCIPAIS (pages) ----------------------------------
import Home from "./pages/Home"
import Cadastro from "./pages/Cadastro"
import Estoque from "./pages/Estoque"
import Reserva from "./pages/Reserva"
import Produtos from "./pages/Produtos"


//DEFININDO COMPONENTE PRINCIPAL-----------------------------------------
export default function App() {
  return (
    // Fragmento <> e </>: permite retornar múltiplos elementos
    <>
      <Navbar/> 
          {/* CORRIGIDO: 'ClassName' para 'className' */}
            <div className="app-container">
               <Sidebar/>
              <main className="main-content"> 
              <Routes>
              {/* NOVO: A rota principal '/' deve renderizar o Home */}
              <Route path="/" element={<Home/>} /> 
              {/* REMOVIDO: A rota path="/home" foi substituída pela rota path="/", conforme o NavBar */}
              <Route path="/cadastro" element={<Cadastro />} /> 
              <Route path="/estoque" element={<Estoque />} />
                {/* CORRIGIDO: 'elements' para 'element' e 'Reserva' para 'reserva' na path */}
              <Route path="/reserva" element={<Reserva />} /> 
              <Route path="/produtos" element={<Produtos />} />
           </Routes>
      </main>
   </div>
   </>
 )
}