import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bulma-components/full";

class MenuChanel extends Component {
    state = {
        select_create: null,
        select_show: null
    }
    changeView (type , e) {
        
        if (type == 1 ) {
            this.setState({select_create: "is-active", select_show: null  })
            this.props.changeView(1)
        }else{
            this.setState({select_create: null, select_show: "is-active"  })
            this.props.changeView(2)
        }
    }
    render() {

        const select_c = this.state.select_create;
        const select_s = this.state.select_show;
        
        let clickName_1 = select_c;
        let clickName_2 = select_s;

        return (
            <div>
                <aside className="menu">
                    <p className="menu-label">
                        Nombre del canal: <br/> {this.props.name} 
                    </p>
                    <ul className="menu-list">
                        <li><a className = {clickName_1} onClick = {this.changeView.bind(this, 1)} >Crear mensaje </a></li>
                        <li><a className = {clickName_2} onClick = {this.changeView.bind(this, 2)}> Mostrar mensaje</a></li>
                    </ul>

                </aside>
            </div>
        );
    }
}

export default MenuChanel;