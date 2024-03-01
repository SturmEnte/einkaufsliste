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

	saveEntries();
	updateEntries();
}

function saveEntries() {
	localStorage.setItem("entries", JSON.stringify(entries));
}

function updateEntries() {
	entriesElemen.innerHTML = "";
	entries.forEach((entry) => {
		let entryElem = document.createElement("div");
		entryElem.classList.add("entry");
		entryElem.innerHTML = entry.name;
		entryElem.onclick = () => {
			entryElem.remove();
			entries = entries.filter((cEntry) => cEntry != entry);
			saveEntries();
		};
		entriesElemen.append(entryElem);
	});
}

document.getElementById("add-entry").onclick = addEntry;
