//set the data opf the stock over the past 7 years. Give the name of the year and the price of stock.
//code referenced from previous coding assignments
//along with LENGTHY youtube video from FreeCodeCamp.org
var data = [
  { year: '2010', price: 30 },
  { year: '2011', price: 35 },
  { year: '2012', price: 38 },
  { year: '2013', price: 190 },
  { year: '2014', price: 250 },
  { year: '2015', price: 260 },
  { year: '2016', price: 270 },
  { year: '2017', price: 290 },
];

//set the width, height, and margin of the page.
var width = 690
var height = 300;
var margin = { top: 20, bottom: 40, left: 27, right: -10 };



var svg = d3.select('#d3-container')
//return the svg container as a selection.
  .append('svg')
  //subtract the height by margin top and bottom and the width by left and right to center the bar graph itself.
  .attr('height', height - margin.top - margin.bottom)
  .attr('width', width - margin.left - margin.right)

//by using d3.scaleband, it allows me to set minimum and maximum range of array values.
var x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .paddingInner(0.2);

//transform data values into variables you can see.
var y = d3.scaleLinear()
  .domain([0, 300])
  .range([height - margin.bottom, margin.top]);


svg
//append svg to group the rectangles together, give them the color "green", put the price of stock in ascending order.
.append("g")
.attr("fill", 'green')
.selectAll("rect")
//put data in ascending values to show the stock price has increased over years
.data(data.sort((a, b) => d3.ascending(a.price, b.price)))
//join the rectangles together.
.join("rect")
//x and y values are determined with the d attribute to draw their specific path.
 .attr("class", "rect")
 .attr('title', (d) => d.price)
 .attr("x", (d, i) => x(i))
 .attr("y", d => y(d.price))
 //classify the height where d is => y which is 0 then subtract it by the y variable which sets the y's height.
 .attr("height", d => y(0) - y(d.price))
 //use x.bandwidth to decide the constant width of each rect.
 .attr("width", x.bandwidth());



//call the price margin to left hand side of the chart and pull the data from the csv to display the price of stock.
function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", "11px")
}

function xAxis(g) {
//call the year to the bottom but it seems to be not working. I don't know where I went wrong with the code.
  g.call(d3.axisBottom(x).tickFormat(i => data[i].year))
  .attr("font-size", "8px")
}

//call the xAxis and yAxis to be assigned to its certain object
svg.append("g").call(xAxis);
svg.append("g").call(yAxis)
svg.node();
