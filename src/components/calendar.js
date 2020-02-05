import React from 'react';
import moment from 'moment';
import '../styles/calendar.scss';
const MONTHS = moment.months(), WEEKDAYS = moment.weekdaysShort();
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().month(),
        }
    }
    renderCalendar = () => {
        const { month } = this.state;
        const startWeek = moment().startOf('month').week(), endWeek = moment().endOf('month').week();
        let weeks = [];
        for (let week = startWeek; week <= endWeek; week++) {
            let startingDate = moment().week(week).startOf('week')
            weeks.push(
                <div className={`week-row`} key={week}>
                    {Array(7).fill(0).map((__, day) => <div key={week + day} className="day">{startingDate.clone().add(day, 'day').format('D')}</div>)}
                </div>
            )
        }
        return weeks;
    }
    render() {
        const { month } = this.state;
        return (
            <div className={`calendar`}>
                <div className="calendar-caption">
                    <h1>{MONTHS[month]}</h1>
                    <button>prev</button>
                    <button onClick={() => this.setState({ month: month + 1 })}>next</button>
                </div>

                <div className="week-days-name week-row">
                    {WEEKDAYS.map(dayName => (
                        <div key={dayName} className="day">{dayName}</div>
                    ))}
                </div>
                {this.renderCalendar()}
            </div>
        )
    }
}