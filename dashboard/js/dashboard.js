function drawGraph() {

  let data = JSON.parse(localStorage.getItem("count"));


  let margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 50
    },
    svg = d3.select('svg'),
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom;
  let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  let x = d3.scaleBand().rangeRound([0, width]).padding(1),
    y = d3.scaleLinear().rangeRound([height, 0]),
    z = d3.scaleOrdinal(['#036888', '#0D833C', '#D2392A']);


  let line = d3.line()
    .x(d => x(d.inventoryType))
    .y(d => y(d.total));

  z.domain(d3.keys(data[0]).filter(key => {
    return key !== "inventoryType";
  }));

  let trends = z.domain().map(name => {
    return {
      name: name,
      values: data.map(d => {
        return {
          inventoryType: d.inventoryType,
          total: +d[name]
        };
      })
    };
  });

  x.domain(data.map(d => d.inventoryType));
  y.domain([0, d3.max(trends, (c => d3.max(c.values, (v => v.total))))]);

  let legend = g.selectAll('g')
    .data(trends)
    .enter()
    .append('g')
    .attr('class', 'legend');

  legend.append('rect')
    .attr('x', width - 20)
    .attr('y', ((d, i) => height / 2 - (i + 1) * 20))
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', (d => z(d.name)));

  legend.append('text')
    .attr('x', width - 8)
    .attr('y', ((d, i) => height / 2 - (i + 1) * 20 + 10))
    .text(d => d.name);


  let trend = g.selectAll(".trend")
    .data(trends)
    .enter()
    .append("g")
    .attr("class", "trend");

  trend.append("path")
    .attr("class", "line")
    .attr("d", (d => line(d.values)))
    .style("stroke", (d => z(d.name)));

  let points = g.selectAll('.points')
    .data(trends)
    .enter()
    .append('g')
    .attr('class', 'points')
    .append('text');


  trend
    .style("fill", "#FFF")
    .style("stroke", (d => z(d.name)))
    .selectAll("circle.line")
    .data(d => d.values)
    .enter()
    .append("circle")
    .attr("r", 5)
    .style("stroke-width", 3)
    .attr("cx", (d => x(d.inventoryType)))
    .attr("cy", (d => y(d.total)));

  g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis-y")
    .call(d3.axisLeft(y).ticks(10));

  let focus = g.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

  focus.append('line')
    .attr('class', 'x-hover-line hover-line')
    .attr('y1', 0)
    .attr('y2', height);

  svg.append('rect')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("mousemove", mousemove);

  let timeScales = data.map(name => x(name.inventoryType));

  function mouseover() {
    focus.style("display", null);
    d3.selectAll('.points text').style("display", null);
  }

  function mouseout() {
    focus.style("display", "none");
    d3.selectAll('.points text').style("display", "none");
  }

  function mousemove() {
    let i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
    let di = data[i - 1];
    focus.attr("transform", "translate(" + x(di.inventoryType) + ",0)");
    d3.selectAll('.points text')
      .attr('x', (d => x(di.inventoryType) + 15))
      .attr('y', (d => y(d.values[i - 1].total)))
      .text(d => d.values[i - 1].total)
      .style('fill', (d => z(d.name)));
  }
}