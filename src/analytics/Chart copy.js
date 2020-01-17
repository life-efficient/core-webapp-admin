import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import plus from "../images/icons/plus.svg"
import Button from './Button';

const make_dataset = (dataset, labels, color, label) => {
  return {
      label: label,
      data: dataset,
      fill: false,
      lineTension: 0.6,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: color,
      pointBackgroundColor: color,
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
  }
}


class LineChart extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      from: props.from ? props.from : 1483228800.0.toString(),
      to: props.to? props.to : new Date().getTime().toString(),
      raw: null
    }
    this.data = {
      datasets: [],
      gridLines: [{
          display: false
      }]
    }
}
  componentDidMount = () => {
      fetch(`https://dihwh38uwi.execute-api.eu-west-2.amazonaws.com/prod/data?_from=${this.state.from}&to=${this.state.to}&dataset=${this.props.dataset}`)
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
              this.setState({data})
          }
      )
  }

  render() {
    console.log('data:', this.state.data)
    if (this.state.data) {
        var labels = [...Array(this.state.data.datasets[0].length).keys()]
        this.data.labels = labels
        // this.data.labels = this.props.labels ? this.props.labels : [...Array(this.props.data.stints.length).keys()]
        // data.datasets[0].data = this.props.data.stints
        // data.datasets[0].label = 'Stints'
        // data.datasets[1].data = this.props.data.avails
        // data.datasets[1].label = 'Availabilities'
        var datasets = this.state.data.datasets
        var data_labels = ['Stints', '"Availabilities"']
        var colors = ['#48C0C0', '#ff9b21']
        for (var i in colors) {
          console.log(i)
          this.data.datasets.push(make_dataset(datasets[i], labels, colors[i], data_labels[i]))
        }
        console.log(this.data.datasets)
        console.log(this.data)
        return (
          <div className="" 
            style={{
              width: '390px',       backgroundColor: 'rgba(75,192,192,0.4)',
              margin:'20px', 
              borderRadius: '1px', 
              padding: '10px', 
              backgroundColor: 'whitesmoke',
              animationDelay: `${0.1*this.props.idx}s`
            }} >
            <div>
              <div style={{float: 'left'}}>
                {this.props.title}
              </div>
              {/* <Button>
                <img style={{float: 'right', height: '15px'}} src={plus}/>
              </Button> */}
            </div>
            {/* <div style={{backgroundColor: 'white'}}> */}

            <Line data={
                // labels: 'yooo',
                this.data
            } 
                // options={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            />
            {/* // height={40} width={2} options={{ maintainAspectRatio: false }} */}
            {/* </div> */}
          </div>
        );
      }
      
    else {
      return null
    }
    }
};

export default LineChart