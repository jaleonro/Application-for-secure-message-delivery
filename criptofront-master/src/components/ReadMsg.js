import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bulma-components/full";
class ReadMsg extends Component {

    render() {
        const msg = this.props.msg
        return (
            <div>
                <article className="message">
                    <div className="message-header">
                        <p>Message </p>
                        <button className="delete" aria-label="delete"></button>
                    </div>
                    <div className="message-body">
                     {msg}
                      </div>
                </article>


            </div>
        );
    }
}

ReadMsg.propTypes = {

};

export default ReadMsg;