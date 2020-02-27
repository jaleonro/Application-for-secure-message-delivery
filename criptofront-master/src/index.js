import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import './styles/loader.css'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './components/Loader'
import Header from './components/Header' 
import Home from './components/Home'
import App from './components/App';
import ViewChannel from './components/ViewChannel'
import CcreateChanel from './components/CcreateChanel'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import IndexMenu from './components/IndexMenu';

const routing = (
    <Router>
      <div>
        <Header title = "Cypherapp" />
        <Route path="/cipher" component={Loader} />
        <Route exact path="/" component={Home} />
        <Route path="/newChanel" component={CcreateChanel} />
        <Route path="/viewchannel" component={ViewChannel} />
        <Route path="/chanel/:id" component={IndexMenu} />
    </div>
    </Router>
  )
 
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
