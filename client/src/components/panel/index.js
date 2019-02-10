import React, {Component} from 'react';
import './style.css';
import Search from '../search';

class Panel extends Component {
    render() {
        return (
            <div className="panel">
                <h1>ITConferences</h1>
                <Search onSearch={(text) => this.props.onSearch(text)}/>
            </div>
        );
    }
}

export default Panel;