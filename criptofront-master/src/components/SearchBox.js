import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class SearchBox extends PureComponent {
    search = React.createRef();
    handle = (e) => {
        const info = {
            busqueda: this.search.current.value
        }
        this.props.lookChanel(info);

    }
    render() {
        return (
            <div className="notification">
                <div className="field has-addons ">
                    <div className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            placeholder="Find a chanel"
                            ref={this.search}
                        />
                    </div>
                    <div className="control">
                        <a className="button is-info" onClick = {this.handle} >Search</a>
                    </div>
                </div>
            </div>
        );
    }
}

SearchBox.propTypes = {};

export default SearchBox;
