import React from 'react';

class ObjectRow extends React.Component {
    render() {
        console.log('VALUES: => ', this.props, this.props.obj, this.props.key);
        return (
            <tr>                
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.birthday}</td>
            </tr >
        )
    }
};

export default ObjectRow;