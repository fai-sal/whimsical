import React from 'react';
import moment from 'moment';
import '../styles/calendar.scss';
const MONTHS = moment.months(), WEEKDAYS = moment.weekdaysShort();
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().month(),
            startWeek: moment().startOf('month').week(),
            endWeek: moment().endOf('month').week()
        }
    }
    renderCalendar = () => {
        const { month, startWeek, endWeek } = this.state;
        // const startWeek = moment().startOf('month').week(), endWeek = moment().endOf('month').week();
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

    handleMonthChange = (type) => {
        const { month, startWeek, endWeek } = this.state;
        this.setState({
            month: type === 'prev' ? month - 1 : month + 1,
            startWeek: type === 'prev' ? startWeek - 1 : endWeek + 1,
            endWeek: type === 'prev' ? startWeek - 5 : endWeek + 5
        })
    }

    render() {
        const { month } = this.state;
        return (
            <div className={`calendar`}>
                <div className="calendar-caption">
                    <h1>{MONTHS[month]}</h1>
                    {/* <button onClick={() => this.setState({ month: month - 1 })}>prev</button>
                    <button onClick={() => this.setState({ month: month + 1 })}>next</button> */}
                    <button onClick={() => this.handleMonthChange('prev')}>prev</button>
                    <button onClick={() => this.handleMonthChange('next')}>next</button>
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