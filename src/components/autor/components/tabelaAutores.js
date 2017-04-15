import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

export default class TabelaAutores extends Component {
  constructor() {
    super();
    this.state = {lista: []};
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/api/autores',
      data: 'json',
      success: resposta => this.setState({lista: resposta})
    });

    PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => this.setState({lista: novaLista}));
  }

  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
          <tr>
            <th>Nome</th>
            <th>email</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.lista.map(autor => {
              return (
                <tr key={autor.id}>
                  <td>{autor.nome}</td>
                  <td>{autor.email}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}