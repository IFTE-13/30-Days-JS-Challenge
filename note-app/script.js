const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.create-btn');

function saveNotes() {
    const notesData = [];
    const noteElements = document.querySelectorAll('.input-box');
    noteElements.forEach(note => {
        notesData.push({
            content: note.value,
            id: note.parentElement.dataset.id || Date.now()
        });
    });
    localStorage.setItem('notes', JSON.stringify(notesData));
}

function loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved) {
        const notesData = JSON.parse(saved);
        notesContainer.innerHTML = '';
        notesData.forEach(note => {
            createNoteElement(note.content);
        });
    }
}

function createNoteElement(content = '') {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'relative w-full';
    noteDiv.setAttribute('data-id', Date.now());
    
    const inputBox = document.createElement('textarea');
    inputBox.className = 'input-box bg-gray-800 border border-gray-600 rounded-xl p-4 w-full min-h-32 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-md resize-none';
    inputBox.placeholder = 'Write your note here...';
    inputBox.value = content;
    
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-icons text-[20px] text-red-400 absolute top-2 right-2 cursor-pointer hover:text-red-300 transition-all hover:scale-110';
    deleteIcon.textContent = 'delete';
    
    noteDiv.appendChild(inputBox);
    noteDiv.appendChild(deleteIcon);
    notesContainer.appendChild(noteDiv);
    
    inputBox.addEventListener('input', () => saveNotes());
    inputBox.addEventListener('blur', () => saveNotes());
}

createBtn.addEventListener('click', () => {
    createNoteElement();
    saveNotes();
});

notesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('material-icons') && e.target.textContent === 'delete') {
        e.target.parentElement.remove();
        saveNotes();
    }
});

loadNotes();

if (notesContainer.children.length === 0) {
    createNoteElement();
}