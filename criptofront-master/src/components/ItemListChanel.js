import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

class ItemListChanel extends PureComponent {
    state =  {redirect: false}
    goChanel(name, id) {
        this.setState({redirect: true})
    }
  render() {
    if (this.state.redirect ) return <Redirect push to={{
        pathname: "/chanel/"+this.props.chanel.id,
        state :{name: this.props.chanel.name}
    }} />;
    return (
      <div>
        <a class="panel-block is-active" onClick = {this.goChanel.bind(this, this.props.chanel.name, this.props.chanel.id) } >
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true" />
          </span>
          {this.props.chanel.name}
        </a>       
      </div>
    );
  }
}

ItemListChanel.propTypes = {};

export default ItemListChanel;
