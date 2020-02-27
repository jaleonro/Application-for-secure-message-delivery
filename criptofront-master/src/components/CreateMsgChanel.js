import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from "react-bulma-components/full";

class CreateMsgChanel extends Component {
    key = React.createRef();
    type = React.createRef();
    msg = React.createRef();
    n_key = React.createRef();
    d_key = React.createRef();

    handle = (e) => {
        e.preventDefault();
        //get data
        const info = {
            key: this.key.current.value,
            type: this.type.current.value,
            msg: this.msg.current.value,
            n_key: this.n_key.current.value,
            d_key: this.d_key.current.value,
            
        }
        this.props.createMessage(info);
        // e.currentTarget.reset(); 
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handle}>
                    <div className="field">
                        <label className="label">Mensaje</label>
                        <div className="control">
                            <textarea ref={this.msg} className="textarea" placeholder="Mensaje"></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">key</label>
                        <div className="control">
                            <input ref={this.key} className="input" type="text" placeholder="key" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Subject</label>
                        <div className="control">
                            <div className="select">
                                <select ref={this.type} >
                                    <option value="DES">DES</option>
                                    <option value="Criptex">CRIPTEX</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">n</label>
                        <div className="control">
                            <input ref={this.n_key} className="input" type="text" placeholder="n key" />
                        </div>
                        
                    </div>
                    <div className="field">
                        <label className="label">private key</label>
                        <div className="control">
                            <input ref={this.d_key} className="input" type="text" placeholder="d key" />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-dark">
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

CreateMsgChanel.propTypes = {

};

export default CreateMsgChanel;