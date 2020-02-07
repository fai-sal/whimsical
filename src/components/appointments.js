import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import '../styles/appointments.scss';
const WEEKDAYS = moment.weekdaysShort();

export default class Appointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'day',
            week: moment().startOf('month').week()
        }
    }


    render() {
        const { week } = this.state;
        console.log('this.state : ', this.state)
        const classNames = clsx({
            'appointment-calendar': true
        });

        const renderCalendar = () => {
            let dates = [], startingDate = moment().week(week).startOf('week');
            dates.push(
                Array(7).fill(0).map((__, day) => {
                    let currentDate = startingDate.clone().add(day, 'day').format('D');
                    return (<div key={currentDate} className={''}>{currentDate}</div>)
                })
            )
            return dates;
        }
        return (
            <div className={classNames}>
                <div className="appointment-calendar-header">
                    {WEEKDAYS.map(dayName => (<div key={dayName} className="day">{dayName}</div>))}
                </div>
                <div className="selected-dates">
                    {renderCalendar()}
                </div>
            </div>
        )
    }
}