import React from 'react';
import './App.css';
import WorkerDropdown from './workerDropdown'
import ShiftCalendar from './shiftCalendar'
import StatDisplay from './statDisplay'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedWorkerName : "", selectedWorkerUUID : ""};
        this.updateSelectedWorker = this.updateSelectedWorker.bind(this);
    }

    updateSelectedWorker(uuid) {
        console.log(uuid)
        this.setState({selectedWorkerUUID : uuid})
    }


    render () {
        return(
            <div className="App">
                <WorkerDropdown selectHandler={this.updateSelectedWorker} />
                <ShiftCalendar />
                <StatDisplay />
            </div>
        )
    }
}

export default App;
