/* Get URl parameters */
var urlParams = location.search
		&& location.search.substr(1).replace(/\+/gi, " ").split("&");

for ( var i in urlParams) {
	var s = urlParams[i].split("=");
	urlParams[i] = urlParams[unescape(s[0])] = unescape(s[1]);
}

var chart1; // globally available chart object

$(function() {
	// The url of the datastream 
	// See here for more info:
	// https://cosm.com/docs/v2/datastream/show.html
	url = "https://api.cosm.com/v2/feeds/40385/datastreams/0";
	
	// Options to be passed to Pachube on request for data
	// It should at least include the API key and the duration 
	// of the time span that we want to plot. 
	// For information see:
	// https://cosm.com/docs/v2/history.html
	data = {
		key : "TmTHdjGOaAK4proqoCrtOAwIK7qSAKxoMzMrelowRFphST0g",
		duration : "10hours",
		interval : "900"
	};

	// Chart options
	// http://www.highcharts.com/documentation/how-to-use
	var options = {
		chart : {
			renderTo : 'container',
		},
		title : {
			text : ''
		},
		legend : {
			enabled : false,
		},
		xAxis : {
			type : 'datetime',
			title : {
				text : 'Time'
			}
		},
		yAxis : {
			title : {
				text : ''
			}
		},
		series : [ {} ]
	};

	// Make the request to Pachube 
	$.getJSON(url + ".json", data, function(sensor_data) {
		// The following code is executed once the response is ready.
		// The returned data is available in the sensor_data variable.
		
		// Collect the returned data points in an Array
		points = [];
		// Populate the array in a format suitable for Highcharts
		$.each(sensor_data.datapoints, function(i, point) {
			points.push([ Date.parse(point.at), parseFloat(point.value) ]);
		});

		// Assign the collected data points to the chart
		options.series[0].data = points;
		// Set the Y-Axis label from the description of the datastream.
		options.yAxis.title.text = sensor_data.tags[0] + ' ['
				+ sensor_data.unit.label + ']';
		// Finally create the chart object with the appropriate options.
		chart1 = new Highcharts.Chart(options);
	});

	/*
	 * Getting list of places:
	 * 	InstantPlaces.Model.Place.findAll({},function(data){
	 * 		console.log(data);
	 * });
	 * 
	 * Getting a specific place:
	 * 	InstantPlaces.Model.Place.findOne({id:2}, function(data){
	 * 		console.log(data);
	 * });
	 *
	 *
	 */
});
