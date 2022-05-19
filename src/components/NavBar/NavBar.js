import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <div className="link-container">
          <Link to="/register" className="link">Registrarse</Link>
        </div>
        <div className="link-container">
          <Link to="/users" className="link">Usuarios</Link>
        </div>
        <div className="link-container">
          <Link to="/profiles" className="link">Perfiles</Link>
        </div>
      </div>
    );
  }

}

export default NavBar;