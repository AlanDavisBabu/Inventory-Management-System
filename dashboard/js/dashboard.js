function drawGraph()
{
let svg = d3.select("svg"),
    margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 50
    },
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3.scalePoint().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

  let line = d3.line()
    .curve(d3.curveBasis)
    .x(function (d) {
      return x(d.inventoryType);
    })
    .y(function (d) {
      return y(d.unit);
    });

  let data = JSON.parse(localStorage.getItem("count"));

  let zAxisKeys = Object.keys(data[0]).filter((item, index) => index !== 0)

  let inventoryModes = zAxisKeys.map(key => {
    return {
      id: key,
      values: data.map(function (d) {
        return {
          inventoryType: d.inventoryType,
          unit: d[key]
        };
      })
    };
  });

  x.domain(data.map(d => d.inventoryType));

  y.domain([
    d3.min(inventoryModes, function (c) {
      return d3.min(c.values, function (d) {
        return d.unit;
      });
    }),
    d3.max(inventoryModes, function (c) {
      return d3.max(c.values, function (d) {
        return d.unit;
      });
    })
  ]);

  z.domain(inventoryModes.map(function (c) {
    return c.id;
  }));

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Unit of Boxes");

  let mode = g.selectAll(".mode")
    .data(inventoryModes)
    .enter().append("g")
    .attr("class", "mode");

  mode.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return line(d.values);
    })
    .style("stroke", function (d) {
      return z(d.id);
    });

  mode.append("text")
    .datum(function (d) {
      return {
        id: d.id,
        value: d.values[d.values.length - 1]
      };
    })
    .attr("transform", function (d) {
      return "translate(" + x(d.value.inventoryType) + "," + y(d.value.unit) + ")";
    })
    .attr("x", 3)
    .attr("dy", "0.35em")
    .style("font", "10px sans-serif")
    .text(function (d) {
      return d.id;
    });
}

