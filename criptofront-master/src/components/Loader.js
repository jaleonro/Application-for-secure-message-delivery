import React, { Component } from 'react';
import App from './App'

class Loader extends Component {
    state = {
        loader : true
    }
    componentDidMount(){
        setTimeout(() => {
        this.setState({loader : false});
        
        }, 3000);

    }
    render() {
        const load = this.state.loader;
        let result;
        if(load){
            result = 
            <div className="sk-folding-cube">
           <div className="sk-cube1 sk-cube"></div>
           <div className="sk-cube2 sk-cube"></div>
           <div className="sk-cube4 sk-cube"></div>
           <div className="sk-cube3 sk-cube"></div>
         </div>    

        }else{
            result = <App/>
        }
        return ( <div>
            {result}
            </div> 
        );
    }
}

export default Loader;