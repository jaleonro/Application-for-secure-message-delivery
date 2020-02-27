import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LookMsgChanel extends PureComponent {
    key = React.createRef();
    type = React.createRef();
    id = React.createRef();
    n_key = React.createRef();
    e_key = React.createRef();

    handle = (e) => {
        e.preventDefault();
        //get data
        const info = {
            key: this.key.current.value,
            type: this.type.current.value,
            n_key: this.n_key.current.value,
            e_key: this.e_key.current.value,
            id : this.id.current.value

            
        }
        this.props.getMessage(info);
        // e.currentTarget.reset(); 
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handle}>
                    <div className="field">
                        <label className="label">key</label>
                        <div className="control">
                            <input ref={this.key} className="input" type="text" placeholder="key" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">type chipher</label>
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
                        <label className="label">public key</label>
                        <div className="control">
                            <input ref={this.e_key} className="input" type="text" placeholder="e key" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">id</label>
                        <div className="control">
                            <input ref={this.id} className="input" type="text" placeholder="id..." />
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


LookMsgChanel.propTypes = {

};

export default LookMsgChanel;