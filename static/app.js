// d3.json("./Data/samples.json").then(function(data) {
//   console.log("Data loaded from samples.json:");
//   console.log(data);
// })

  
function buildMetadata(sample) {
  d3.json("Data/samples.json").then((data) => {
    var metadata= data.metadata;
    var resultsarray= metadata.filter(sampleobject => 
      sampleobject.id == sample);
    var result= resultsarray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });

  });
}



function buildCharts(sample) {

// Use `d3.json` to fetch the sample data for the plots
d3.json("Data/samples.json").then((data) => {
  var samples= data.samples;
  var resultsarray= samples.filter(sampleobject => 
      sampleobject.id == sample);
  var result= resultsarray[0]

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;


  // Build a bubbleChart 

  var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "otu_ids" },
    hovermode: "closest",
    };

    var DataBubble = [ 
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.newPlot("bubble", DataBubble, LayoutBubble);


// Bar Chart

  var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
  ];

  var barLayout = {
    title: "Top 10 Bacterias Found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", bar_data, barLayout);
});
}
 

function init() {
// Grab a reference to the dropdown 
var selector = d3.select("#selDataset");


// Use the list of sample names to populate the select options
d3.json("Data/samples.json").then(function (data) {
  console.log(data)
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });


  const firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
});
}

function optionChanged(newSample) {

buildCharts(newSample);
buildMetadata(newSample);
}



// Initialize the dashboard
init();