const entryNameInputElem = document.getElementById("entry-name");
const entriesElemen = document.getElementById("entries");

let entries = [];

try {
	let parsedEntries = JSON.parse(localStorage.getItem("entries"));
	if (parsedEntries.length && parsedEntries.length > 0) {
		entries = parsedEntries;
		updateEntries();
	}
} catch {
	console.log("Parsed entries where not found or saved wrongly");
	console.log("Deleting old entries...");
	localStorage.removeItem("entries");
}

function addEntry() {
	const name = entryNameInputElem.value;

	console.log(entries);

	entries.push({
		name,
		created: Date.now(),
	});

	localStorage.setItem("entries", JSON.stringify(entries));

	updateEntries();
}

function updateEntries() {
	entriesElemen.innerHTML = "";
	entries.forEach((entry) => {
		entriesElemen.innerHTML += `<div class="entry">${entry.name}</div>`;
	});
}

document.getElementById("add-entry").onclick = addEntry;
