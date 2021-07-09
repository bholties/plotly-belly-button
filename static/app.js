var drawChart = function(x_data, y_data, hoverText, metadata) {


  var metadata_panel = d3.select("#sample-metadata");
  metadata_panel.html("");
  Object.entries(metadata).forEach(([key, value]) => {
      metadata_panel.append("p").text(`${key}: ${value}`);
  });
  function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json("samples.json").then((data) => {
      var samples= data.samples;
      var resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
      var result= resultsarray[0]
  
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      var values = result.sample_values;
  
  var trace = {
      x: x_data,
      y: y_data,
      text: hoverText,
      type: 'bar',
      orientation: 'h'
  };

  var data = [trace];

  Plotly.newPlot('bar', data);

  var trace2 = {
      x: x_data,
      y: y_data,
      text: hoverText,
      mode: 'markers',
      marker: {
          size: y_data,
          color: x_data
      }
  };

  var data2 = [trace2];

  Plotly.newPlot('bubble', data2);


});

var xval = data.otu_ids;
var yval = data.sample_values;
var label = data.otu_labels;
var size = data.sample_values;

var bubbles = {
  x: xval,
  y: yval,
  label: label,
  mode: 'markers',
  marker: {
    size: size,
    color: xval
  }
}
var data = [bubbles];

var layout = {
  title: "Bacteria Size",
};
Plotly.newPlot("bubble",data,layout);



var populateDropdown = function(names) {

  var selectTag = d3.select("#selDataset");
  var options = selectTag.selectAll('option').data(names);

  options.enter()
      .append('option')
      .attr('value', function(d) {
          return d;
      })
      .text(function(d) {
          return d;
      });

};

var optionChanged = function(newValue) {

  d3.json("Data/samples.json").then(function(data) {

  sample_new = data["samples"].filter(function(sample) {

      return sample.id == newValue;

  });
  
  metadata_new = data["metadata"].filter(function(metadata) {

      return metadata.id == newValue;

});

x_data = sample_new[0]["otu_ids"];
y_data = sample_new[0]["sample_values"];
hoverText = sample_new[0]["otu_labels"];

console.log(x_data);
console.log(y_data);
console.log(hoverText);

drawChart(x_data, y_data, hoverText, metadata_new[0]);
});

d3.json("Data/samples.json").then(function(data) 

{

  populateDropdown(data["names"]);


  x_data = data["samples"][0]["otu_ids"];
  y_data = data["samples"][0]["sample_values"];
  hoverText = data["samples"][0]["otu_labels"];
  metadata = data["metadata"][0];


  drawChart(x_data, y_data, hoverText, metadata);

  });

  };

  }

}
