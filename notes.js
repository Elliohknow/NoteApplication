const fs = require('fs');
//get the file string and return it as a json object
var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
};
//save the notes into a file
var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
//add and save notes
//do not add notes with duplicate titles
var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note) => note.title === title);
	
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};
//return a list of all notes
var getAll = () => {
	return fetchNotes();
};
//read a single note
var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title === title);
	
	return filteredNotes[0];
};
//remove a saved note from the file
var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	
	return notes.length !== filteredNotes.length;
};
//log the title and body of a note to the console
var logNote = (note) => {
	debugger;
	console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};
//export all the methods that app.js will use
//fetchNotes and saveNotes need not be exported 
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};

