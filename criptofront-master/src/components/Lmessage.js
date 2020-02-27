import React, { Component } from 'react';

class Lmessage extends Component {

    showStr = () => {
        const id_rta = this.props.data
       if (id_rta == null) return null
        return  "container col-sm-20 p-4 mb-2  text-dark "
    }
    showId = () => {
        const id_rta = this.props.data;
        if (id_rta == null) return null
        return    <text> message:<br/> { id_rta} </text>
      

    }
    render() {
        return (
            <div className= {this.showStr()}>
            {this.showId()}
            </div>
        )

    }
    
}


export default Lmessage;