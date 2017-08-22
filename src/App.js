import React, { Component } from 'react';
import * as d3 from 'd3';
import ForceGraph from './components/force-graph';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", (error, data) => {
      if (error)
        throw error;
      else
        this.setState({ data });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Shared borders - D3 Force Directed Graph</h1>
        </div>
        <div className="App-body">
          <ForceGraph
            data = {this.state.data}
          />
        </div>
      </div>
    );
  }
}

export default App;
