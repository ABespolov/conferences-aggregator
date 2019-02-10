import React, { Component } from 'react';
import './style.css';

class ReminderSelect extends Component {
    
    render() {
        const {setReminder, daysCount} = this.props;
        const reminderArray = [3, 7, 14];
        const remindersList = reminderArray.map((days) => {
            const selected = daysCount === days ? "selected-reminder" : "";
            return <li key={days} className={selected}  onClick={() => setReminder(days)}>За {days} дней(я)</li>
        }); 
        return (
            <>
                <div className="reminder-select">
                    <ul>
                        {remindersList}
                    </ul>
                </div>
            </>
        );
    }
}

export default ReminderSelect;