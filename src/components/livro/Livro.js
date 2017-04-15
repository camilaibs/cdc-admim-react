import React, { Component } from 'react';
import FormularioLivro from './components/formularioLivro';
import TabelaLivros from './components/tabelaLivros';

export default class LivroBox extends Component {
  render() {
    return (
      <div id="main">
        <div className="header">
          <h1>Cadastro de livros</h1>
        </div>

        <div className="content" id="content">
          <FormularioLivro />
          <TabelaLivros />
        </div>
      </div>
    );
  }
}