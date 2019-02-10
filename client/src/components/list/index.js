import React, { Component } from 'react';
import ListItem from '../listItem';
import './style.css';

class List extends Component{
    render(){
        const {data, searchKeys} = this.props;
        const dataArr = [];
        for(let key in data){
            if(searchKeys === null || searchKeys.includes(key)) {
                dataArr.push(<li key={key} className='listItem'><ListItem data={data[key]}/></li>);
            }
        }
        return(
            <ul className="list">{dataArr}</ul>
        );
    }
}

export default List;