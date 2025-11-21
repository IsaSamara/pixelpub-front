// src/components/Navbar.jsx
import React from "react";

// IMPORTANDO COMPONENTE DE NAVEGAÇÃO /
import { Link } from 'react-router-dom' //importa o link da biblioteca react router DOM (Link permite anavegação rápida)

//DEFININDO COMPONENTE NAVBAR
export default function Navbar() {
    return (
        // CORREÇÃO 1: O <header> deve envolver tudo e usa a classe 'topbar'
                <header className="topbar">

         <nav className="nav-links">
             <Link to="/">HOME</Link>
             <Link to="/cadastro">CADASTRO</Link>
             <Link to="/estoque">ESTOQUE</Link>
             <Link to="/reserva">RESERVA</Link>
             <Link to="/produtos">PRODUTOS</Link>
        </nav>

     <button className="login-btn">LOGIN</button>
         </header> // FECHAMENTO CORRETO do header

    //PRECISO POR O LOGO PEDI PARA ISA *******************************************************
    )
}
