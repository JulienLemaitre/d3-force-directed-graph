import React, {Component} from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class ForceGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.data) {
      const width = 900;
      const height = 600;
      const { nodes, links } = this.props.data;

      let svg = d3.select(ReactFauxDOM.createElement('svg'))
        .attr("width", width)
        .attr("height", height);

      let simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink())
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr('stroke-width', 1);

      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr('r', 5)
        .attr('fill', 'steelblue')
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

      node.append("title")
        .text( d => d.country);

      simulation.nodes(nodes)
        .on("tick", ticked);

      simulation.force("link")
        .links(links);

      function ticked() {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return (
        <div className="chart">
          {svg.node().toReact()}
        </div>
      );
    } else {
      return <div className="chart">Loading...</div>
    }
  }
}

export default ForceGraph;