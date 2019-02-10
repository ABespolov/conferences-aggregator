import React, {Component} from 'react';
import ReminderSelect from '../reminderSelect';
import './style.css';

const CHECK_REMINDER_TIME = 1000 * 60; // checking each minute for triggering

class Reminder extends Component {
    state = {
        showReminderSelect: false,
        reminderSet: false,
        date: null
    };
    showSelect = () => {
        this.setState(({showReminderSelect}) => {
            return {
                showReminderSelect: !showReminderSelect
            }
        })
    };
    setReminder = (days) => {
        this.setState(({reminderSet, showReminderSelect}) => {
            let newReminderSet = false;
            if (reminderSet !== days) {
                newReminderSet = days;
                this.setNotification(newReminderSet);
            }
            return {
                reminderSet: newReminderSet,
                showReminderSelect: !showReminderSelect
            }
        });
    };
    setNotification = (newReminderSet) => {
        const {date, title} = this.props;
        let currentDate = new Date(date);
        const stopNotification = () => {
            this.setState({
                reminderSet: false
            });
        };
        currentDate.setDate(currentDate.getDate() - newReminderSet);
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            navigator.serviceWorker.getRegistration().then((reg) => {
                const options = {
                    body: title,
                    icon: 'https://www.nicepng.com/png/full/89-894019_grou-ps-logo-vector-icon.png',
                    vibrate: [100, 50, 100]
                };
                const checkTime = setInterval(() => {
                    if (currentDate.getTime() < (new Date()).getTime()) {
                        reg.showNotification(`Осталось меншьше ${this.state.reminderSet} дней до`, options);
                        stopNotification();
                        clearInterval(checkTime);
                    }

                }, CHECK_REMINDER_TIME);
            })
        }
    };

    render() {
        const {reminderSet, showReminderSelect} = this.state;
        const reminderClassName = reminderSet ? "reminder selected-reminder" : "reminder";
        return (
            <>
                {!showReminderSelect ?
                    <div className={reminderClassName} onClick={this.showSelect}>
                        <i className="far fa-bell"></i>
                    </div>
                    : <ReminderSelect className="selected-reminder" daysCount={reminderSet}
                                      setReminder={this.setReminder}/>
                }
            </>
        );
    }
}

export default Reminder;