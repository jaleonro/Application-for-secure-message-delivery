import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bulma-components/full";
import CreateChanel from "./CreateChanel";
import axios from "axios";
import UrlApp from './Url'
class CcreateChanel extends PureComponent {
  state = {
    notification_state: ""
  };
  createChanel = data => {

    let url = UrlApp[0] + "/chanels";
    const s_info = {
      name: data.name,
      email_a: data.remitente,
      email_b: data.destinatario
    };
    axios.post(url, { chanel: s_info }).then(res => {
      console.log(res.status);
      if (res.status == 226) {
        this.setState({ notification_state: "Error" });
      } else if (res.status == 201) {
        this.setState({ notification_state: "Success" });
      }
      setTimeout(() => {
        this.setState({ notification_state: "" });
      }, 10000);
    });
  };
  render() {
    let notification = null;
    if (this.state.notification_state == "Error") {
        notification = <div className="notification is-danger">
            Los campos no deben estar <strong> vacios</strong>, si no esta vacio pruebe con otro <strong>nombre</strong>
      </div>
    } else if (this.state.notification_state == "Success") {
       
        notification = <div className="notification is-success">
                    Se ha agregado el canal con exito
                    </div>
    } else {
        notification = null
    }
    return (
      <div>
        {notification}
        <div className="columns is-mobile">
          <div className="column is-half is-offset-one-quarter">
            <CreateChanel createChanel={this.createChanel} />
          </div>
        </div>
      </div>
    );
  }
}

export default CcreateChanel;
