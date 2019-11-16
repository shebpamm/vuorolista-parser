import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class WorkerDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: [],
        };
    }
    componentDidMount() {
        fetch("api/workers/names")
        .then(response => response.json())
        .then(data => this.setState({ workers: data.map(
            (d) => {
                return { key: d.replace("\n", " "), value: d.replace("\n", " "), text: d.replace("\n", " ") }

            }
        ) })
    );
}

render() {
    return <Dropdown
    placeholder='Worker..'
    fluid
    search
    selection
    options={this.state.workers}
    />
}
}

export default WorkerDropdown
