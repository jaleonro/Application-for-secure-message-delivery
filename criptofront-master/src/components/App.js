import React, { Component } from 'react';
import Header from './Header';
import AddForm from './AddForm'
import LookMessage from './LookMessage'
import CreateMessage from './CreateMessage';
import Lmessage from './Lmessage';
//import loader from '/styles/loader';
import axios from 'axios'
import UrlApp from './Url'

class App extends Component {

  componentDidMount(){
    console.log("TEST")

  }
   state = {
    dataM: {},
    idr : 0, //despues de crear el mensaje
    msg : null, //mensaje obtenido con la llave 
    loading : false,
    loading_look :false
   }
   createMessage = (data) => {
    console.log(UrlApp)
    let url = UrlApp[0] + "/criptos"
    console.log(url)
    const s_info = {
       name : data.name,
       key  : data.key,
       type : data.type,
       msg  : data.msg
      }
     //request = `{"cripto": {name:${dataM.}}   }`
    axios.post(url, {"cripto": s_info})
      .then(res => {
        this.setState({
          loading :true
        })
        setTimeout(() => {
          this.setState({
            idr: res.data.id,
            loading:false
           })     
          console.log(res.data.id);
        }, 3000);

        
      })
      
      this.setState({
        dataM : s_info
       })
     
      
   }
   
   getMessage =(data) => {
    let url = UrlApp[0] + "/messages/read"
    const s_info = {
      name : data.name,
      key  : data.key,
      type : data.type,
      id  : data.idm
     }
       axios.post(url, s_info)
      .then(res => { 
        this.setState({loading_look : true})
        setTimeout(() => {
          this.setState({loading_look: false , msg: res.data.rta})
        }, 2000 );
        console.log(res.data.rta);
      })
 
   } 

  render() {
    const loading = this.state.loading;
    const loading_look = this.state.loading_look;
    let result;
    let result2;
    if(loading){
      result = <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    }else{
      result =  <CreateMessage  data = {this.state.idr}/>
    }
    if(loading_look){
      result2 = <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
    }else{
      result2 =  <Lmessage  data = {this.state.msg}/>
    }

    return (
      <div>
       
        <div className = "row">
          <AddForm createMessage = {this.createMessage} />
          <LookMessage getMessage = {this.getMessage} />
        </div>
        <div >
          {result}
          {result2}
          
        </div>
      </div>

    );
  }
}
export default App;
 