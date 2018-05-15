var width = 700, height = 700,padding = 50;
var data = regionData.filter(d => (d.medianAge >= 15));
var xScale = d3.scaleLinear()
               .domain(d3.extent(data, d => d.adultLiteracyRate))
               .range([padding,width - padding]);

var yScale = d3.scaleLinear()
			   .domain(d3.extent(regionData, d => d.subscribersPer100))
			   .range([height-padding,padding]);

var radiusScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.urbanPopulationRate))
                    .range([5,20]);

var colorScale = d3.scaleLinear()
                   .domain(d3.extent(regionData, d => d.extremePovertyRate))
                   .range(["lightgreen",'black']);

var tooltip = d3.select("body")
                .append("div")
                  .classed("tooltip",true);


    


d3.select("svg")
            .attr("width", width)
            .attr("height", height)
            .selectAll("circle")
               .data(regionData)
               .enter()
               .append("circle")
               .attr("cx",d => xScale(d.adultLiteracyRate))
               .attr("cy", d => yScale(d.subscribersPer100))
               .attr("r", d => radiusScale(d.urbanPopulationRate))
               .attr("fill", d => colorScale(d.extremePovertyRate))
               .on("mousemove",showToolTip)
               .on("mouseout", hideToolTip);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);
var xAxisTranslate = height - padding;
d3.select("svg")
  .append("g")
  .attr("transform", "translate(0,"+(xAxisTranslate)+") ")
  .call(xAxis);



 d3.select("svg")
   .append("g")
   .attr("transform", "translate("+padding+",0)")
   .call(yAxis);

d3.select("svg")
  .append("text")
  .attr("x",width/2)
  .attr("y",height - padding)
  .attr("dy", "1.9em")
  .attr("text-anchor", "middle")
  .text("Literacy Rate, up and above 15 age")
  .style("font-size","1.2em");

 d3.select("svg")
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x",-height/2)
  .attr("y",padding)
  .attr("dy", "-1.7em")
  .attr("text-anchor", "middle")
  .text("Subscribers per 100")
  .style("font-size","1.2em");

d3.select("svg")
  .append("text")
  .attr("x",width/2)
  .attr("y",padding)
  .attr("dy", "-0.7em")
  .attr("text-anchor", "middle")
  .text("Literacy Rate, up and above 15 age")
  .style("font-size","2.0em");

function showToolTip(d){
  tooltip
                  .style("opacity", 1)
                  .style("left",d3.event.x + "px")
                  .style("top", d3.event.y + "px")
                  .html(
                    `<p>Region : ${d.region}</p>
                     <p>PovertyRate: ${d.extremePovertyRate}</p>
                     <p>LiteracyRate: ${d.adultLiteracyRate}</p>` 
                  );
}

function hideToolTip(d){
  tooltip
                  .style("opacity", 0);
}





















