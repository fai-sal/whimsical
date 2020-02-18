import React, { Fragment } from 'react';
import moment from 'moment';

export default class Day extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showTimeSpan: null,
            appointments: {
                '2020-02-11': [
                    {
                        date: '11',
                        month: 'February',
                        name: 'Monday',
                        year: '2020',
                        startingTime: '10.00',
                        endingTime: '11.30',
                        assignedStuff: 'Mr. X',
                        purpose: 'Hair treatment'
                    }
                ]

            }
        }
    }

    renderHour = (hour, name, date, month) => {
        const { showTimeSpan } = this.state;
        const timeSpans = [0, 0.25, 0.5, 0.75];
        return timeSpans.map(item => {
            return (
                < div
                    key={item}
                    onMouseEnter={() => this.setState({ showTimeSpan: `${hour + item}${name}${date}${month}` })}
                    onMouseLeave={() => this.setState({ showTimeSpan: null })}
                    className={`time-span${showTimeSpan === `${hour + item}${name}${date}${month}` ? ' show' : ''}`}
                >
                    <span className="label" > {moment.utc((hour + item) * 3600 * 1000).format('HH : mm')}</span>
                </div >
            );
        })
    }

    render() {
        const { seletedDays } = this.props;
        return (
            <Fragment>
                {
                    seletedDays.length > 0 &&
                    <div className={`selected-dates`}>
                        {
                            seletedDays.map(({ date, name }, index) => {
                                return (<div key={`${date}${name}`} className="slected-day">{date} {name}</div>)
                            })
                        }
                    </div>
                }
                <div className="appointments">
                    <div className="hour-labels">
                        {
                            Array(24).fill(0).map((_, hour) => <div className="hour-label" key={hour}>{moment.utc(hour * 3600 * 1000).format('HH:mm')}</div>)
                        }

                    </div>
                    {
                        seletedDays.map(({ name, date, month }) => {
                            return (
                                <div className={`day${name==='Sunday'?' off':''}`} key={name + date + month}>

                                    {
                                        Array(24).fill(0).map((_, hour) => {
                                            return (
                                                <div className={`hour ${hour}`} key={hour} >
                                                    {this.renderHour(hour, name, date, month)}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }

                </div>
            </Fragment>
        )
    }
}

Day.defaultProps = {
    seletedDays: [
        { date: '11', month: '02', name: 'Monday', year: '2020' },
        { date: '12', month: '02', name: 'Tuesday', year: '2020' },
        { date: '13', month: '02', name: 'Wednesday', year: '2020' },
        { date: '14', month: '02', name: 'Thursday', year: '2020' },
        { date: '15', month: '02', name: 'Friday', year: '2020' },
        { date: '16', month: '02', name: 'Satday', year: '2020' },
        { date: '17', month: '02', name: 'Sunday', year: '2020' },
        { date: '18', month: '02', name: 'Monday', year: '2020' }
    ]
}