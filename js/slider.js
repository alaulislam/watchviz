var token;
var sliderSimple = d3
.sliderBottom()
.min(0)
.max(20)
.step(1)
.width(190)
.displayValue(false)
.ticks(0)
.default(0.015)
.on('onchange', val => {
	//console.log(val); 
	token = val;                      
	d3.select('#bar_'+val).style("opacity", 1);
   // d3.select('#bar_'+val).style("fill", "red");
   d3.select('#barTextLabelForDayName_'+val).style("fill", "red");
	var i = 0;
	while(i<21){
		if(i != val){
			d3.select('#bar_'+i).style("opacity", .2);
			d3.select('#barTextLabelForDayName_'+i).style('fill', 'black')
		}
	   // d3.select('#bar_'+i).style("fill", "#4694FF");
	   
		i++;
	}

})

var gSimple = d3
.select('div#slider')
.append('svg')
.attr('width', 500)
.attr('height', 100)
.append('g')
.attr('transform', 'translate(30,30)');

gSimple.call(sliderSimple);

d3.select('div#slider').on("dblclick",function(d){
	console.log(token);
		// $('#tooltipPosition2').show();
		// tooltip_v2.html("Week day: " + d.dayName + "<br style=\"line-height:100%;font-size: 3px; \">Day Count: " + format(d.dayNumber)  + "<br>Sleep Hour(Qty): " + format(d.SleepQty))
		
	// d3.select('#tooltip_v2').html("Week day: " + 10 + "<br style=\"line-height:100%;font-size: 3px; \">Day Count: " + 20  + "<br>Sleep Hour(Qty): " + 30)
	//         .style("opacity", .95)

});

