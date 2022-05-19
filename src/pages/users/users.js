import React from 'react';
import ObjectRow from "../../components/ObjectRow/ObjectRow";
import { getUsers } from '../../service/users';

class User extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "my friend (from state)!"
        };
        this.updateMessage = this.updateMessage.bind(this)

        this.getData();
    }

    users = [];

    getData() {
        getUsers().then(json => {
            console.log(json);
            if (this.users.length !== json.length) {
                this.users = json;
                this.updateMessage();
            }
        });
    }

    updateMessage() {
        console.log('llega al metodo');
        this.setState({
            message: "my friend (from changed state)!"
        });
        this.getData();
    }

    render() {
        return (
            <div className="App">
                <h3> Usuarios </h3>
                <header className="App-header">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Cumpleaños</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.users.map((object, i) => <ObjectRow obj={object} key={i} />)}
                        </tbody>
                    </table>
                    <button onClick={this.updateMessage}>Cargar Datos</button>
                </header>
            </div >
        )
    }
}

export default User;