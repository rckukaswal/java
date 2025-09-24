// Notes page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Load notes data and display
    loadNotesData();
    
    // Set up search functionality
    setupSearch();
});

function loadNotesData() {
    fetch('data/notes.json')
        .then(response => response.json())
        .then(data => {
            // Display categories
            displayCategories(data.categories);
            
            // Display notes
            displayNotes(data.notes);
            
            // Store notes data for filtering and search
            window.allNotes = data.notes;
            window.filteredNotes = data.notes;
        })
        .catch(error => {
            console.error('Error loading notes data:', error);
            document.getElementById('notesContainer').innerHTML = 
                '<p>Error loading notes. Please try again later.</p>';
        });
}

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('notesCategories');
    
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'category-btn active';
    allButton.setAttribute('data-category', 'all');
    allButton.textContent = 'All Notes';
    allButton.addEventListener('click', filterNotesByCategory);
    categoriesContainer.appendChild(allButton);
    
    // Add category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.setAttribute('data-category', category.id);
        button.innerHTML = `<i class=\"${category.icon}\"></i> ${category.name}`;
        button.addEventListener('click', filterNotesByCategory);
        categoriesContainer.appendChild(button);
    });
}

function displayNotes(notes) {
    const notesContainer = document.getElementById('notesContainer');
    
    if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No notes found matching your criteria.</p>';
        return;
    }
    
    notesContainer.innerHTML = '';
    
    notes.forEach(note => {
        const noteCard = createNoteCard(note);
        notesContainer.appendChild(noteCard);
    });
}

function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.setAttribute('data-note-id', note.id);
    
    // Find category name
    const category = window.allNotesCategories.find(cat => cat.id === note.category);
    const categoryName = category ? category.name : note.category;
    
    card.innerHTML = `
        <div class="note-header">
            <h3>${note.title}</h3>
            <div class="note-meta">
                <span>${categoryName}</span>
                <span>${note.tags.length} tags</span>
            </div>
        </div>
        <div class="note-body">
            <p class="note-description">${note.description}</p>
            <div class="note-tags">
                ${note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add click event to view note
    card.addEventListener('click', function() {
        showNoteContent(note);
    });
    
    return card;
}

function filterNotesByCategory(e) {
    const selectedCategory = e.target.getAttribute('data-category');
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Filter notes
    if (selectedCategory === 'all') {
        window.filteredNotes = window.allNotes;
    } else {
        window.filteredNotes = window.allNotes.filter(note => note.category === selectedCategory);
    }
    
    // Apply search filter if there's a search term
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        window.filteredNotes = window.filteredNotes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) ||
            note.description.toLowerCase().includes(searchTerm) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    // Display filtered notes
    displayNotes(window.filteredNotes);
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm === '') {
            // If search is empty, show notes based on category filter
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
            if (activeCategory === 'all') {
                window.filteredNotes = window.allNotes;
            } else {
                window.filteredNotes = window.allNotes.filter(note => note.category === activeCategory);
            }
        } else {
            // Filter notes by search term
            window.filteredNotes = window.allNotes.filter(note => 
                note.title.toLowerCase().includes(searchTerm) ||
                note.description.toLowerCase().includes(searchTerm) ||
                note.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // Display filtered notes
        displayNotes(window.filteredNotes);
    });
}

function showNoteContent(note) {
    // Create or update modal
    let modal = document.getElementById('noteModal');
    
    // Set modal content
    document.getElementById('modalNoteTitle').textContent = note.title;
    document.getElementById('modalNoteContent').innerHTML = `
        <div class="note-content">${marked.parse(note.content)}</div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Close modal when X is clicked
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Store categories for reference
window.allNotesCategories = [];
fetch('data/notes.json')
    .then(response => response.json())
    .then(data => {
        window.allNotesCategories = data.categories;
    });
