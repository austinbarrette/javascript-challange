//Set table data to data from data.js file
// from data.js
var tableData = data;

// Get a reference to the table body, input field and button
var tbody = d3.select("tbody");
var filterButton = d3.select("#filter-btn");
var inputDate = d3.select("#datetime");
var inputState = d3.select("#state");
var resetButton = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Use d3 to update each cell's text with values from data.js file
var ufos = (dataInput) => {
    dataInput.forEach(ufofinder => {
	    var row = tbody.append("tr");
	    columns.forEach(column => row.append("td").text(ufofinder[column]))
});
}

// Correlate values to be searched using filter button
filterButton.on("click", () => {
	d3.event.preventDefault();
	var inputDates = inputDate.property("value").trim();
	var inputStates = inputState.property("value").toLowerCase().trim();
	// Filter Dates
	var filterDates = data.filter(data => data.datetime === inputDates);
	console.log(filterDates)
    // Filter States
	var filterStates = data.filter(data => data.state === inputStates);
	console.log(filterStates)
    // Combine Date & State filter to show in one table
	var filterData = data.filter(data => data.datetime === inputDates && data.state === inputStates);
	console.log(filterData)

	// Add filtered data to table
	tbody.html("");

	let response = {filterData, filterStates, filterDates}

	if (response.filterData.length !== 0) {
		ufos(filterData);
	}
		else if (response.filterData.length === 0 && ((response.filterStates.length !== 0 || response.filterDates.length !== 0))){
			ufos(filterStates) || ufos(filterDates);
	
		}
		else {
			tbody.append("tr").append("td").text("No results found!"); 
        }
})

resetbtn.on("click", () => {
	tbody.html("");
	ufos(data)
	console.log("Table reset")
})