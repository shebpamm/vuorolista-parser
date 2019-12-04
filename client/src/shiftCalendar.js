import React from 'react'
import Calendar from 'react-calendar';

export default class ShiftCalendar extends React.Component {
  state = {
    value: new Date(),
  }

  onChange = value => {
      console.log(value)
      this.setState({ value })
  }

  tileContent = ({date, view}) => {
  }

  tileClassName = ({date, view}) => {
      if (date.getDate() % 2 === 0) return "test-mod"
  }

  render() {
    const { value } = this.state;

    return (
      <Calendar
        selectRange
        tileClassName={this.tileClassName}
        minDetail="year"
        returnValue="range"
        onChange={this.onChange}
        value={value}
      />
    );
  }
}
