import React, {Component} from 'react';
import * as d3 from 'd3';

const flags = {"sc": "0 -180", "cz": "-75 -45", "gb": "-225 -60", "bh": "-150 -15", "et": "0 -60", "cn": "-325 -30", "tv": "-350 -195", "mo": "-25 -135", "cy": "-50 -45", "se": "-50 -180", "sj": "-150 -180", "ru": "-300 -165", "cv": "-25 -45", "fm": "-125 -60", "no": "-100 -150", "zw": "-100 -225", "pn": "-50 -165", "mp": "-50 -135", "bs": "-350 -15", "bj": "-200 -15", "at": "-275 0", "eu": "-25 -60", "ie": "-75 -90", "ug": "-50 -210", "va": "-175 -210", "bz": "-75 -30", "cd": "-125 -30", "sd": "-25 -180", "pa": "-250 -150", "ca": "-100 -30", "ps": "-100 -165", "bm": "-250 -15", "eg": "-300 -45", "bi": "-175 -15", "il": "-100 -90", "wf": "-350 -210", "nz": "-200 -150", "py": "-175 -165", "na": "-325 -135", "cm": "-300 -30", "cu": "0 -45", "ba": "0 -15", "eh": "-325 -45", "an": "-175 0", "vn": "-300 -210", "mg": "-275 -120", "tm": "-225 -195", "tn": "-250 -195", "dm": "-175 -45", "gh": "-375 -60", "bf": "-100 -15", "az": "-375 0", "vc": "-200 -210", "gq": "-125 -75", "lk": "-375 -105", "tl": "-200 -195", "sa": "-350 -165", "bd": "-50 -15", "us": "-100 -210", "td": "-50 -195", "je": "-300 -90", "bv": "0 -30", "mh": "-300 -120", "ro": "-250 -165", "vu": "-325 -210", "yt": "-25 -225", "pr": "-75 -165", "lt": "-50 -120", "am": "-150 0", "uy": "-125 -210", "fj": "-75 -60", "ci": "-225 -30", "pf": "-300 -150", "zm": "-75 -225", "er": "-350 -45", "nc": "-350 -135", "kn": "-125 -105", "ms": "-125 -135", "bo": "-300 -15", "au": "-300 0", "ve": "-225 -210", "gl": "-25 -75", "ge": "-275 -60", "tk": "-175 -195", "ax": "-350 0", "kg": "-25 -105", "vi": "-275 -210", "dz": "-225 -45", "ir": "-200 -90", "cl": "-275 -30", "cg": "-175 -30", "tr": "-300 -195", "is": "-225 -90", "hn": "-350 -75", "ad": "0 0", "mu": "-175 -135", "lu": "-75 -120", "mk": "-325 -120", "ht": "0 -90", "tz": "0 -210", "bw": "-25 -30", "sk": "-175 -180", "sh": "-100 -180", "pw": "-150 -165", "za": "-50 -225", "fo": "-150 -60", "hm": "-325 -75", "mq": "-75 -135", "by": "-50 -30", "mm": "-375 -120", "um": "-75 -210", "md": "-200 -120", "it": "-250 -90", "io": "-150 -90", "gs": "-175 -75", "bb": "-25 -15", "ai": "-100 0", "mx": "-250 -135", "ao": "-200 0", "tj": "-150 -195", "ee": "-275 -45", "bt": "-375 -15", "mz": "-300 -135", "qa": "-200 -165", "gg": "-350 -60", "gd": "-250 -60", "sy": "-375 -180", "my": "-275 -135", "ag": "-75 0", "tw": "-375 -195", "br": "-325 -15", "to": "-275 -195", "gr": "-150 -75", "ki": "-75 -105", "af": "-50 0", "mn": "0 -135", "la": "-275 -105", "fi": "-50 -60", "km": "-100 -105", "kr": "-175 -105", "li": "-350 -105", "do": "-200 -45", "gt": "-200 -75", "jp": "-375 -90", "jm": "-325 -90", "pe": "-275 -150", "so": "-275 -180", "dk": "-150 -45", "vg": "-250 -210", "bl": "-225 -15", "me": "-225 -120", "ua": "-25 -210", "ar": "-225 0", "co": "-350 -30", "gw": "-250 -75", "gi": "0 -75", "mc": "-175 -120", "kw": "-200 -105", "nf": "0 -150", "gf": "-300 -60", "ni": "-50 -150", "hr": "-375 -75", "es": "-375 -45", "lr": "0 -120", "hu": "-25 -90", "gm": "-50 -75", "np": "-125 -150", "mr": "-100 -135", "jo": "-350 -90", "lb": "-300 -105", "be": "-75 -15", "tg": "-100 -195", "pk": "-375 -150", "lc": "-325 -105", "ws": "-375 -210", "tc": "-25 -195", "sr": "-300 -180", "ec": "-250 -45", "gp": "-100 -75", "nl": "-75 -150", "iq": "-175 -90", "pl": "0 -165", "al": "-125 0", "si": "-125 -180", "id": "-50 -90", "ga": "-200 -60", "kh": "-50 -105", "ky": "-225 -105", "om": "-225 -150", "pt": "-125 -165", "tt": "-325 -195", "as": "-250 0", "cr": "-375 -30", "sv": "-350 -180", "mw": "-225 -135", "ng": "-25 -150", "sl": "-200 -180", "gn": "-75 -75", "kz": "-250 -105", "ls": "-25 -120", "lv": "-100 -120", "pg": "-325 -150", "sm": "-225 -180", "fr": "-175 -60", "bn": "-275 -15", "ph": "-350 -150", "ma": "-150 -120", "rs": "-275 -165", "rw": "-325 -165", "sg": "-75 -180", "aw": "-325 0", "sn": "-250 -180", "sb": "-375 -165", "ck": "-250 -30", "dj": "-125 -45", "de": "-100 -45", "hk": "-300 -75", "gy": "-275 -75", "mf": "-250 -120", "in": "-125 -90", "nu": "-175 -150", "mv": "-200 -135", "kp": "-150 -105", "cf": "-150 -30", "sz": "0 -195", "tf": "-75 -195", "ne": "-375 -135", "th": "-125 -195", "ml": "-350 -120", "ye": "0 -225", "uz": "-150 -210", "nr": "-150 -150", "ch": "-200 -30", "re": "-225 -165", "fk": "-100 -60", "st": "-325 -180", "ke": "0 -105", "bg": "-125 -15", "ae": "-25 0", "pm": "-25 -165", "mt": "-150 -135", "ly": "-125 -120", "gu": "-225 -75"};

class ForceGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    const width = 900;
    const height = 600;
    const { nodes, links } = nextProps.data;

    let svg = d3.select(this.svg)
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
      .attr('class', d => `flag flag-${d.code}`)
      .attr('r', 7.5)
      .attr('fill', d => `url(#image-${d.code})`)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text(d => d.country);

    svg.append('defs')
      .selectAll('pattern')
      .data(nodes)
      .enter().append('pattern')
      .attr('width', 25)
      .attr('height', 15)
      .attr('id', d => `image-${d.code}`)
      .append('image')
      .attr('href', 'flags.png')
      .attr('display', 'inline-block')
      .attr('background-repeat', 'none')
      .attr('x', d => {
          if (flags[d.code])
            return flags[d.code].split(" ")[0] - 5;
        })
      .attr('y', d => {
        if (flags[d.code])
          return flags[d.code].split(" ")[1];
      });


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

    return false;
  }

  render() {
    return (
      <div
        className="chart">
        <svg
          ref={(svg => this.svg = svg)}
        ></svg>
      </div>
    );
  }
}

export default ForceGraph;