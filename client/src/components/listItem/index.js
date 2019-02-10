import React, {Component} from 'react';
import Reminder from '../reminder';
import './style.css';

class ListItem extends Component {
    render() {
        const {data} = this.props;
        return (
            <>
                <Reminder title={data.title} date={data.date}/>
                <p className="eventName">{data.title}</p>
                <p className="eventDescription">{data.description}</p>
                <button onClick={() => window.open(data.link, "_blank")}
                        className='eventPage-button'>Страница мероприятия
                </button>
            </>
        );
    }
}

export default ListItem;