import React, { Component } from 'react';
import FormularioAutor from './components/formularioAutor';
import TabelaAutores from './components/tabelaAutores';

export default class AutorBox extends Component {
  render() {
    return (
      <div id="main">
        <div className="header">
          <h1>Cadastro de autores</h1>
        </div>

        <div className="content" id="content">
          <FormularioAutor />
          <TabelaAutores />
        </div>
      </div>
    );
  }
}