// from data.js
const tableData = data;

// table, field and button references
let tbody = d3.select("tbody");
let dateTime = d3.select("#datetime");
let state = d3.select("#state");
let filterButton = d3.select("#filter-btn");
let resetButton = d3.select("#reset-btn");

// function for building table
function buildTable(data) {
  data.forEach((UFO) => {
    let row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
      let cell = row.append("td");
      cell.text(value);
    });
  });
}

// function for filtering
function filterClick() {
  d3.event.preventDefault();
  let dateInput = dateTime.property("value");
  let stateInput = state.property("value").toLowerCase();
  if (dateInput && stateInput !== "") {
    var filteredData = tableData.filter(value => value.datetime === dateInput && value.state === stateInput);
  } else if (dateInput !== "") {
    var filteredData = tableData.filter(value => value.datetime === dateInput);
  } else if (stateInput !== "") {
    var filteredData = tableData.filter(value => value.state === stateInput);
  } else {
    var filteredData = tableData;
  }
  tbody.html("");
  buildTable(filteredData);
}

// function for resetting the table and form
function resetClick() {
  d3.event.preventDefault();
  document.getElementById("datetime").value = "";
  document.getElementById("state").value = "";
  tbody.html("");
  buildTable(tableData);
}

// event listeners for the form buttons that call filterClick on a click of the filter button and resetClick on a click of the reset button
filterButton.on("click", filterClick);
resetButton.on("click", resetClick);

dateTime.on("keyup", function() {
  // Number 13 is the "Enter" key on the keyboard
  if (d3.event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    filterClick();
  }
});

// build the table when the page loads
buildTable(tableData);
