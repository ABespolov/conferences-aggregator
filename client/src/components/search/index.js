import React, {Component} from 'react';
import './style.css';

class Search extends Component {
    state = {
        text: ''
    };
    onChange = (e) => {
        this.setState({
            text: e.target.value
        });
        this.props.onSearch(e.target.value);
    };

    render() {
        return (
            <div className="search-block">
                <i className="fas fa-search"></i>
                <input onChange={this.onChange} value={this.state.text}
                       className="search" type="text" placeholder="Поиск даты или мероприятия"/>
            </div>
        );
    }
}

export default Search;