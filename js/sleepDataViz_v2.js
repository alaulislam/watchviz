$( document ).ready(function() {
    console.log('Activated!');
    d3.selection.prototype.dblTap = function(callback) {
        var last = 0;
        return this.each(function() {
          d3.select(this).on("touchstart", function(e) {
              if ((d3.event.timeStamp - last) < 500) {
                return callback(e);
              }
              last = d3.event.timeStamp;
          });
        });
      }
});


var width = 250,
    height = 200;
    var bar_v2 ;

var barFlag = true;

var paddingBar = [40, 110, 50, 140];



var chart = d3.select("#svgCanvas2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("align","center");

    var tooltip_v2 = d3.select("#tooltipPosition2")
    .append("div")
    .attr("class", "tooltip_v2")
    .style("opacity", 0)
    .attr("align","center");

var colours_v2 = {
    barColor: "#4694FF"
};



var format = d3.format(",");

d3.csv("data/SleepData2.csv", row, function(data) {

    var xScale = d3.scaleBand() // bar chart bar width
    .domain(data.map(function(d) {
        return d.dayNameShort;
    }))
    .range([0, width]) 
    .padding(0.7)


    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.SleepQty;
        })])
       .range([height - paddingBar[2], paddingBar[0]]); // height = 450  ,  paddingBar[2] = 50, paddingBar[0] = 40


    //var xAxisBar = d3.axisBottom(xScale).ticks(21);
    
    // var gXBar = chart.append("g") // x- axis for weekdays
    // .attr("class", "xAxis xAxisBar")
    // .attr("transform", "translate(0," + (height - paddingBar[2]) + ")")
    // .call(xAxisBar);


   // gXBar.call(xAxisBar)
    // .selectAll(".tick text")
    // .style("font-size", "9px")
    // .call(wrap, xScale.step());


    var yAxis = d3.axisLeft(yScale)
        .tickValues([2, 4, 6, 8, 10])
        .tickSizeInner(-(width - paddingBar[1] - paddingBar[3]));

    var duration = 1500;

    var previousType = "bar";

 


    var gY = chart.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + 100+ ",0)");

    //gY.call(yAxis);


    var barTitle = chart.append("text")
        .attr("x", paddingBar[3] + (width - paddingBar[3] - paddingBar[1]) / 2)
        .attr("y", 26)
        .attr("class", "barTitle")
        .style("text-anchor", "middle")
        .text("");
        // .text(function(d) { 
        //     data.forEach(function(d) {
        //         var dayNo = d.dayNumber; 
        //         alert(dayNo);
        //         return dayNo; 
        //     });
        // })

    var xAxisText = chart.append("text")
        .attr("class", "axisText")
        .attr("x", paddingBar[3] + (width - paddingBar[3] - paddingBar[1]) / 2)
        .style("text-anchor", "middle")
        .attr("y", height - paddingBar[2] + 46)
        //.text("Week day");

    //     var bar_v2 = chart.selectAll('g')
    //     .data(data)
    //     .enter()
    //     .append("g")
        
        
    // bar_v2.append("rect")
    //     .attr("x", function(d, i) {
    //         return i * (width / data.length);
    //      })
    //     .attr("y", height - paddingBar[2])
    //     .attr("width", xScale.bandwidth())
    //     .attr("height", 0) 
    //     .style("fill", colours_v2.barColor)
    //     .style("stroke", "darkslategray")
    //     .style("stroke-opacity", 0);

    bar_v2 = chart.selectAll(null)
        .data(data)
        .enter().append("g")
        .append("rect")
        .attr("id", function(d, i) {return 'bar_' + i})
        .attr("x", function(d, i) {
            return i * (width / data.length);
         })
        .attr("y", height - paddingBar[2])
        .attr("height", 0)
        .attr("width", xScale.bandwidth())
        .style("fill", colours_v2.barColor)
        .style("stroke", "darkslategray")
        .style("stroke-opacity", 0);


        //var thisTicks = [2, 4, 6, 8, 10];

        bar_v2.transition()
            .duration(duration)
            .attr("rx", 0) //bar dimension--skewed/circled/rectangle
            .attr("ry", 0)
            // .attr("x", function(d) {
            //     return xScale(d.dayNameShort);
            // })

            .attr("x", function(d, i) {
                return i * (width / data.length);
            })
            .attr("y", function(d) {
               return yScale(d.SleepQty);
            })
            .attr("height", function(d) {
                return height - paddingBar[2] - yScale(d.SleepQty)
            })
            .attr("width", xScale.bandwidth())
            .style("fill", colours_v2.barColor)
            .style("stroke-opacity", 0);

            chart.append("g")
            .attr('class', 'bar-label')
            .attr("id", "barTextLabel")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.SleepQty)
            .attr("fill","black")
            .attr("text-anchor", "middle")
            .attr("font-size", "8px")
            .attr("y", function(d) { return yScale(d.SleepQty); })
            .attr("x", function(d, i) {
                return i * (width / data.length)+5;
           })

           chart.append("g")
           .attr('class', 'bar-label label')
           .selectAll("text")
           .data(data)
           .enter()
           .append("text")
           .attr("x", function(d, i) {
                return i * (width / data.length);
           })
           .attr("id", function(d, i) {return 'barTextLabelForDayName_' + i})
            .attr("y", height - paddingBar[2] +10)
            .style("font-size", "10px")
            .style('fill', 'black')
            .style('font-weight', "bold")
        	// .attr("font-family", "HelveticaNeue-Bold")
            .text(function (d) {
                return d.dayNameShort.substring(0,1);;
            });
        

        bar_v2.on("mousemove", function(d) {
            bar_v2.style("opacity", .2);
                    d3.select(this).style("opacity", 1);
                    d3.select('div#info_section').html("Week day: " + d.dayName + "<br style=\"line-height:100%;font-size: 3px; \">Day Count: " + format(d.dayNumber)  + "<br>Sleep Hour(Qty): " + format(d.SleepQty))
                        .style("opacity", .95)
                }).on("mouseout", function() {
                    bar_v2.style("opacity", 1)
                })

        chart.selectAll(".xAxisBar .tick").each(function(d) {
            d3.select(this).transition()
                .duration(duration)
                .attr("transform", "translate(" + (xScale(d) + xScale.bandwidth() / 2) + ",0)");
        });

        // yAxis.tickValues(thisTicks)
        //     .tickSizeInner(-(width - paddingBar[1] - paddingBar[3]));

        gY.transition()
            .duration(duration)
            .attr("transform", "translate(" + paddingBar[3] + ",0)")
            //.call(yAxis);


});

function row(d) {
    d.SleepQty = +d.SleepQty;
    d.dayNumber = +d.dayNumber;
    return d;
}

function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            // if (tspan.node().getComputedTextLength() > width) {
            //     line.pop();
            //     tspan.text(line.join(" "));
            //     line = [word];
            //     tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            // }
        }
    });
}
