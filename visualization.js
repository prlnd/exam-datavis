function $(id) {
    return document.getElementById(id);
}

// Global Options
let cd = Chart.defaults
let cdp = cd.plugins;
cd.font.family = "Lato";
cd.font.size = 18;
cd.color = "#777";
cd.responsive = true;
cd.maintainAspectRatio = false;
cdp.title.display = true;
cdp.title.font.size = 25;
cdp.legend.position = "right";
cdp.legend.labels.color = "#000";
// cd.plugins.layout = {
//   padding: {
//     left: 50,
//     right: 0,
//     bottom: 0,
//     top: 0
//   }
// };

let globalData;
let globalLocations;
let globalSchools;
let ctx;
let myChart = null;
let selectedTopicIndex;
let selectedCounty;
let selectedYear;
const COUNTRY = "Ország";

function destoryChart() {
  if (myChart != null)
    myChart.destroy();
}

function chart0(results) {
  let data = [
    avg(results.map(result => result.romanian)),
    avg(results.map(result => result.mathematics)),
    avg(results.map(result => result["native lang"]))
  ];
  destoryChart();
  myChart = new Chart(ctx, {
    type: "bar", // bar, horizontal bar, pie, line, doughnut, radar, polarArea
    data: {
      labels: ["Román", "Matematika", "Anyanyelv"],
      datasets: [{
        // label: "Jegy",
        data: data,
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ]
      }],
      borderWith: 1,
      borderColor: "#777",
      hoverBorderWidth: 3,
      hoverBorderColor: "#000"
    },
    options: {
      plugins: {
        title: {
          text: $("topics")[selectedTopicIndex].text,
        },
        legend: {
          display: false
        }
      }
    }
  });
}

function chart1(results) {
  let hungarians = results.filter(result => result.nationality == "Maghiara");
  let romanians = results.filter(result => result.nationality == "Romana");
  let data = [
    [
      avg(hungarians.map(result => result.mathematics)),
      avg(hungarians.map(result => result["native lang"]))
    ],
    [
      avg(romanians.map(result => result.mathematics)),
      avg(romanians.map(result => result.romanian))
    ]
  ];
  destoryChart();
  myChart = new Chart(ctx, {
    type: "bar", // bar, horizontal bar, pie, line, doughnut, radar, polarArea
    data: {
      labels: ["Matematika", "Anyanyelv"],
      datasets: [{
        label: "Magyar",
        data: data[1],
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      }, {
        label: "Román",
        data: data[0],
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }],
      borderWith: 1,
      borderColor: "#777",
      hoverBorderWidth: 3,
      hoverBorderColor: "#000"
    },
    options: {
      plugins: {
        title: {
          text: $("topics")[selectedTopicIndex].text,
        },
        legend: {
          display: true
        }
      }
    }
  });
}

function chart2(results) {
  let hungarians = results.filter(result => result.nationality == "Maghiara").length;
  let romanians = results.filter(result => result.nationality == "Romana").length;
  destoryChart();
  myChart = new Chart(ctx, {
    type: "pie", // bar, horizontal bar, pie, line, doughnut, radar, polarArea
    data: {
      labels: ["Magyarok", "Románok"],
      datasets: [{
        label: "Magyar",
        data: [hungarians, romanians],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)"
        ]
      }],
      borderWith: 1,
      borderColor: "#777",
      hoverBorderWidth: 3,
      hoverBorderColor: "#000"
    },
    options: {
      plugins: {
        title: {
          text: $("topics")[selectedTopicIndex].text,
        },
        legend: {
          display: true
        }
      }
    }
  });
}

function chart3(results) {
  let data = results.sort(function(x, y) {
      if (x.avg < y.avg)
        return 1;
      else if (x.avg > y.avg)
        return -1;
      else
        return 0;
    })
    .slice(0, 10);
  let locations = data.map(result => result.location);
  let grades = data.map(result => result.avg);
  destoryChart();
  myChart = new Chart(ctx, {
    type: "bar", // bar, horizontal bar, pie, line, doughnut, radar, polarArea
    data: {
      labels: locations,
      datasets: [{
        data: grades,
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ]
      }],
      borderWith: 1,
      borderColor: "#777",
      hoverBorderWidth: 3,
      hoverBorderColor: "#000"
    },
    options: {
      indexAxis: 'y',
      plugins: {
        title: {
          text: $("topics")[selectedTopicIndex].text,
        },
        legend: {
          display: false
        }
      }
    }
  });
}

function chart4(results) {
  let data = results.sort(function(x, y) {
      if (x.avg < y.avg)
        return 1;
      else if (x.avg > y.avg)
        return -1;
      else
        return 0;
    })
    .slice(0, 10);
  let schools = data.map(result => result.shortschoolname);
  let grades = data.map(result => result.avg);
  destoryChart();
  myChart = new Chart(ctx, {
    type: "bar", // bar, horizontal bar, pie, line, doughnut, radar, polarArea
    data: {
      labels: schools,
      datasets: [{
        data: grades,
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ]
      }],
      borderWith: 1,
      borderColor: "#777",
      hoverBorderWidth: 3,
      hoverBorderColor: "#000"
    },
    options: {
      indexAxis: 'y',
      plugins: {
        title: {
          text: $("topics")[selectedTopicIndex].text,
        },
        legend: {
          display: false
        }
      }
    }
  });
}

function avg(array) {
  let total = 0;
  let length = 0;
  array.forEach(i => {
    if (i != "") {
      total += i;
      length += 1;
    }
  });
  return total / length;
}

function filterResults(results) {
  if (selectedCounty == COUNTRY)
    return results;
  else
    return results.filter(result => result.county == selectedCounty);
}

function showChart() {
  data = filterResults(globalData);
  switch (topics.selectedIndex) {
    case 0: chart0(data); break;
    case 1: chart1(data); break;
    case 2: chart2(data); break;
    case 3: chart3(filterResults(globalLocations)); break;
    case 4: chart4(filterResults(globalSchools)); break;
    default:
      console.log("Ismeretlen menüpont: " + $("topics")[selectedTopicIndex].text);
      break;
  }
}

function getSelectedTopic() {
  const topics = $("topics");
  return topics.selectedIndex;
}

function onTopicChange() {
  selectedTopicIndex = getSelectedTopic();
  showChart();
}

function getSelectedCounty() {
  const counties = $("counties");
  const index = counties.selectedIndex;
  return counties.options[index].text;
}

function onCountyChange() {
  selectedCounty = getSelectedCounty();
  showChart();
}

function getSelectedYear(params) {
  const years = $("years");
  const index = years.selectedIndex;
  return years.options[index].text;
}

function onYearChange() {
  selectedYear = getSelectedYear();
  fetch("data\\grades\\grades" + selectedYear + ".json")
    .then(response => response.json())
    .then(json => {
      globalData = json.results;
      fetch("data\\locations\\locations" + selectedYear + ".json")
        .then(response => response.json())
        .then(json2 => {
          globalLocations = json2.results;
          fetch("data\\schools\\schools" + selectedYear + ".json")
            .then(response => response.json())
            .then(json3 => {
              globalSchools = json3.results;
              showChart();
            });
        });
    });
}

function initializeData() {
  fetch("data\\grades\\grades2016.json")
    .then(response => response.json())
    .then(json => {
      globalData = json.results;
      addCounties();
      selectedYear = getSelectedYear();
      selectedTopicIndex = getSelectedTopic();
      selectedCounty = getSelectedCounty();
      fetch("data\\locations\\locations" + selectedYear + ".json")
        .then(response => response.json())
        .then(json2 => {
          globalLocations = json2.results;
          fetch("data\\schools\\schools" + selectedYear + ".json")
            .then(response => response.json())
            .then(json3 => {
              globalSchools = json3.results;
              showChart();
            });
        });
    });
}

function addCounties() {
  let counties = [...new Set(globalData.map(x => x.county))];
  counties.unshift(COUNTRY);
  counties.forEach(item => {
    let option = document.createElement("option");
    option.text = item;
    $("counties").add(option);
  });
}

window.onload = function() {
  ctx = $("myChart").getContext("2d");
  
  initializeData();
}