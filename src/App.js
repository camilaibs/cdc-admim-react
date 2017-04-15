import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import HomeBox from './components/home/Home';
import AutorBox from './components/autor/Autor';
import LivroBox from './components/livro/Livro';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link"><span></span></a>

          <div id="menu">
            <div className="pure-menu">
              <Link className="pure-menu-heading" to="/">CDC Admin</Link>
              <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
              </ul>
            </div>
          </div>

          <Switch>
            <Route path="/" exact component={HomeBox} />
            <Route path="/autor" component={AutorBox} />
            <Route path="/livro" component={LivroBox} />
            <Route component={HomeBox} /> {/* No match path */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
