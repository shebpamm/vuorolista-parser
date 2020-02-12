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

        Promise.all([
            fetch("api/workers/names").then(response => response.json()),
            fetch("api/workers/uuids").then(response => response.json())

        ]).then((data) => {

            var [names, uuids] = data
            this.setState({ workers: uuids.map(
                (uuid, idx) => {
                    return { key:  names[idx].replace("\n", " "), value: uuid, text:  names[idx].replace("\n", " ") }
                        }
                    )})
                })


}

render() {
    return <Dropdown
    placeholder='Worker..'
    fluid
    search
    selection
    options={this.state.workers}
    onChange={(e, {value}) => this.props.selectHandler(value)}
    />
}
}

export default WorkerDropdown
