import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ItemListChanel from './ItemListChanel';
class ListChanels extends PureComponent {
    render() {
        return (
            <div className = "bck">
                <nav class="panel">
                    <p class="panel-heading">
                        Chanels
                    </p>
                    {Object.keys(this.props.chanels).map(key => (
                        
                        <ItemListChanel chanel = {this.props.chanels[this.props.chanels.length-key-1]} key = {this.props.chanels.length-key-1} />    
                    )) }
                    
                </nav>  
            
            </div>
        );
    }
}

export default ListChanels;