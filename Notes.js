const fs = require("fs")
const chalk = require("chalk")

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  debugger

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    })

    saveNotes(notes)
    console.log(chalk.bgGreen("New note added!"))
  } else {
    console.log(chalk.bgRed("Note title taken!"))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const existingNotes = notes.filter((note) => note.title !== title)

  if (notes.length > existingNotes.length) {
    saveNotes(existingNotes)
    console.log(chalk.bgGreen("Note deleted! Title: " + title))
  } else {
    console.log(chalk.bgRed("Note does not exist!"))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json")
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.bold("Your Notes:"))
  notes.forEach((note) => {
    console.log(chalk.green(note.title))
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const existingNote = notes.find((note) => note.title === title)

  if (existingNote) {
    console.log(chalk.bold.green(existingNote.title))
    console.log(existingNote.body)
  } else console.log(chalk.bgRed("No title found!"))
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
}
