import React, { Component } from "react"
import "./Table.css"

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            raw_data: null
        }
    }

    componentDidMount = () => {this.getData()}

    getData = () => {
        console.log(`getting data from: ${this.props.from} to ${this.props.to}`)
        // fetch(`https://dihwh38uwi.execute-api.eu-west-2.amazonaws.com/prod/data?from=${this.props.from}&to=${this.props.to}&dataset=${this.props.dataset}`)
        fetch(`https://dihwh38uwi.execute-api.eu-west-2.amazonaws.com/prod/data?dataset=${this.props.dataset}`)
        .then(
            data => {
                // console.log(data)
                data = data.json()
                // console.log(data)
                return data
            }
        )
        .then(
            data => {
                console.log(data)
                this.setState({raw_data: data})
            }
        )
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.to !== newProps.to || oldProps.from !== newProps.from) {
            this.getData()
        }
    }


    render() {

        if (this.state.raw_data) {
            var raw_data = this.state.raw_data
            console.log(raw_data)
            var col_names = Object.keys(raw_data[0])
            console.log(col_names)
            return (
                <table>
                    <tr>
                        {col_names.map((r) => {return <th>{r}</th>})}
                    </tr>
                    {
                        raw_data.map(
                            (row) => {
                                return (
                                <tr>
                                    {

                                        Object.values(row).map(
                                            (i) => {return <td>{i}</td>}
                                        )
                                    }
                                </tr>
                                )
                            }
                        )
                    }
                </table>
            )
        }
        else {
            return null
        }

    }    
}

export default Table