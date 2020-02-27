import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bulma-components/full";
import MenuChanel from "./MenuChanel";
import CreateMsgChanel from "./CreateMsgChanel";
import axios from 'axios'

import "../styles/menu.css";
import LookMsgChanel from "./LookMsgChanel";
import ReadMsg from "./ReadMsg";
import UrlApp from './Url'
class IndexMenu extends PureComponent {
  state = {
    page: null,
    id: null,
    notification_state: "",
    notification_can: "",
    read: false,
    msg : ""
  };

  createMessage = (data) => {
    const id = this.props.match.params.id;
    
    let url = `${UrlApp[0] }/chanels/${id}/msgchanels`
    const s_info = {
      key: data.key,
      type: data.type,
      msg: data.msg,
      n_key: data.n_key,
      d_key: data.d_key
    }
    //request = `{"cripto": {name:${dataM.}}   }`
    axios.post(url, { "msgchanel": s_info })
      .then(res => {
        console.log(res.status);

        if (res.status == 226) {
          this.setState({ notification_state: "Error" });
        } else if (res.status == 200) {
          this.setState({ notification_state: "Success", id: res.data.id });
        }
        setTimeout(() => {
          this.setState({ notification_state: "" });
        }, 10000);

      })
  }
  getMessage = (data) => {
    let url = `${UrlApp[0] }/msgchanels/read`
    const s_info = {
      key: data.key,
      type: data.type,
      id: data.id,
      n_key: data.n_key,
      e_key: data.e_key,
      id_chanel: this.props.match.params.id
    }
    axios.post(url, { "msgchanel": s_info })
      .then(res => {
        console.log(res);
        console.log(res.status);
        
        if (res.status == 203) {
          this.setState({ notification_state: "Error get" });
        } else if (res.status == 200) {
          this.setState({ notification_state: "Success", id: res.data.id  });
        }else if( res.status == 202){
          this.setState({notification_state: "Allow" , read: true, msg : res.data})
        }
        setTimeout(() => {
          this.setState({ notification_state: "" });
        }, 10000);

      })



  }


  changeView = (data) => {
    if (data == 1) {
      this.setState({ page: 1 })
    } else if (data == 2) {
      this.setState({ page: 2 })
    } else {
      this.setState({ page: null })
    }

  }
  render() {
    let notification = null;
    if (this.state.notification_state == "Error") {
      notification = <div className="notification is-danger">
        No se ha podido crear el  <strong> mensaje</strong>
      </div>
    } else if (this.state.notification_state == "Success") {

      notification = <div className="notification is-success">
        se ha agregado el mensaje con <strong>exito!!  </strong> con id:  <strong> {this.state.id}</strong>
      </div>
    } else if (this.state.notification_state == "Error get") {

      notification = <div className="notification is-danger">
        no tiene acceso al <strong>mensaje!! </strong>
      </div>
    }else if (this.state.notification_state == "Allow") {

      notification = <div className="notification is-primary">
        Puede ver el <strong>mensaje!! </strong> abajo
      </div>
    }

    else {
      notification = null
    }


    const viewStatus = this.state.page;
    let pageV;
    let msg;
    if (viewStatus == null) {
      pageV = null;
    } else if (viewStatus == 1) {
      pageV = <CreateMsgChanel createMessage={this.createMessage} />
    } else {
      pageV = <LookMsgChanel getMessage={this.getMessage} />;
    }
    if (this.state.read == true){
      msg =  <ReadMsg msg = {this.state.msg}/>

    }else{
      msg = null

    }
    return (
      <div>
        {notification}
        <div className="columns is-multiline">
          <div className="column is-one-fifth bck">
            <MenuChanel name={this.props.location.state.name} changeView={this.changeView} />
          </div>
          <div className="column notification">{pageV}</div>
        </div>
        {msg}


      </div>
    );
  }
}

IndexMenu.propTypes = {};

export default IndexMenu;
