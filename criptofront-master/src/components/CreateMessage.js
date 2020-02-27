import React, { Component } from 'react';

class CreateMessage extends Component {

    showStr = () => {
        const id_rta = this.props.data
        if (id_rta == 0) return null
        return  "container col-sm-1 p-4 mb-2  text-dark "
    }
    showId = () => {
        const id_rta = this.props.data;
        if (id_rta == 0) return null
        return    < h5> ID: {id_rta} </h5>
      
    }
    render() {
        return (
            <div  className= {this.showStr() }>
            {this.showId()}
            </div>
        )

    }
    
}


export default CreateMessage;