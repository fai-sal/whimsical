import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import '../styles/calendar.scss';
const MONTHS = moment.months(), WEEKDAYS = moment.weekdaysShort();
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().month(),
            startWeek: moment().startOf('month').week(),
            endWeek: moment().endOf('month').week(),
            totalWeeks: moment().month('11').endOf('month').diff(moment().month('0').startOf('month'), 'week')
        }
    }
    renderCalendar = () => {
        const { month, startWeek, endWeek } = this.state;

        let weeks = [];
        for (let week = startWeek; week <= endWeek; week++) {
            let startingDate = moment().week(week).startOf('week');
            weeks.push(
                <div className={`week-row`} key={week}>
                    {Array(7).fill(0).map((__, day) => {
                        let currentDate = startingDate.clone().add(day, 'day').format('D'),
                            classNames = clsx({
                                day: true,
                                outside: !startingDate.clone().add(day, 'day').isSame(moment().month(`${month}`).startOf('month').format("YYYY-MM-DD"),'month')
                            });
                        return (<div key={week + day} className={classNames}>{currentDate}</div>)
                    })
                    }
                </div>
            )
        }
        return weeks;
    }

    handleMonthChange = (type) => {
        if (type === 'nextMonth') {
            this.setState(state => {
                return {
                    month: moment().month(`${state.month}`).add(1, 'months').month(),
                    startWeek: moment().month(`${state.month}`).add(1, 'months').startOf('month').week(),
                    endWeek: moment().month(`${state.month}`).add(1, 'months').endOf('month').week()
                }
            })
        } else if (type === 'prevMonth') {
            this.setState(state => {
                return {
                    month: moment().month(`${state.month}`).subtract(1, 'months').month(),
                    startWeek: moment().month(`${state.month}`).subtract(1, 'months').startOf('month').week(),
                    endWeek: moment().month(`${state.month}`).subtract(1, 'months').endOf('month').week()
                }
            })
        }

    }

    render() {
        const { month } = this.state;
        return (
            <div className={`calendar`}>
                <div className="calendar-caption">
                    <h1>{MONTHS[month]}</h1>
                    <button onClick={() => this.handleMonthChange('prevMonth')}>prev</button>
                    <button onClick={() => this.handleMonthChange('nextMonth')}>next</button>
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