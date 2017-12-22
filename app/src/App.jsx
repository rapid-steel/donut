import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Chart from './components/Chart.jsx'



export default class App extends Component {
    render() {
        return (
            <div>
              <Chart></Chart>
            </div>
        )
    }
}
