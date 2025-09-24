// Programs page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Load programs data and display
    loadProgramsData();
    
    // Set up filter functionality
    setupFilters();
});

function loadProgramsData() {
    fetch('data/programs.json')
        .then(response => response.json())
        .then(data => {
            // Display categories
            displayCategories(data.categories);
            
            // Display programs
            displayPrograms(data.programs);
            
            // Store programs data for filtering
            window.allPrograms = data.programs;
        })
        .catch(error => {
            console.error('Error loading programs data:', error);
            document.getElementById('programsContainer').innerHTML = 
                '<p>Error loading programs. Please try again later.</p>';
        });
}

function displayCategories(categories) {
    const categoryFilters = document.getElementById('categoryFilters');
    
    // Add "All" button
    categoryFilters.innerHTML = '<button class="filter-btn active" data-category="all">All</button>';
    
    // Add category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-category', category.id);
        button.textContent = `${category.name} (${category.count})`;
        categoryFilters.appendChild(button);
    });
}

function displayPrograms(programs) {
    const programsContainer = document.getElementById('programsContainer');
    
    if (programs.length === 0) {
        programsContainer.innerHTML = '<p>No programs found matching your filters.</p>';
        return;
    }
    
    programsContainer.innerHTML = '';
    
    programs.forEach(program => {
        const programCard = createProgramCard(program);
        programsContainer.appendChild(programCard);
    });
}

function createProgramCard(program) {
    const card = document.createElement('div');
    card.className = 'program-card';
    
    // Difficulty badge class
    const difficultyClass = `difficulty-${program.difficulty}`;
    
    card.innerHTML = `
        <div class="program-header">
            <h3>${program.title}</h3>
            <div class="program-meta">
                <span class="difficulty-badge ${difficultyClass}">${program.difficulty}</span>
                <span>${program.category}</span>
            </div>
        </div>
        <div class="program-body">
            <p class="program-description">${program.description}</p>
            <div class="program-tags">
                ${program.tags.map(tag => `<span class="program-tag">${tag}</span>`).join('')}
            </div>
            <div class="program-actions">
                <button class="btn btn-primary btn-small view-code" data-id="${program.id}">View Code</button>
                <button class="btn btn-secondary btn-small">Save</button>
            </div>
        </div>
    `;
    
    // Add event listener to view code button
    card.querySelector('.view-code').addEventListener('click', function() {
        showProgramCode(program);
    });
    
    return card;
}

function setupFilters() {
    // Category filter
    document.getElementById('categoryFilters').addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            // Update active button
            document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Apply filters
            applyFilters();
        }
    });
    
    // Difficulty filter
    document.getElementById('difficultyFilters').addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            // Update active button
            document.querySelectorAll('#difficultyFilters .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Apply filters
            applyFilters();
        }
    });
}

function applyFilters() {
    const activeCategory = document.querySelector('#categoryFilters .filter-btn.active').dataset.category;
    const activeDifficulty = document.querySelector('#difficultyFilters .filter-btn.active').dataset.difficulty;
    
    let filteredPrograms = window.allPrograms;
    
    // Apply category filter
    if (activeCategory !== 'all') {
        filteredPrograms = filteredPrograms.filter(program => program.category === activeCategory);
    }
    
    // Apply difficulty filter
    if (activeDifficulty !== 'all') {
        filteredPrograms = filteredPrograms.filter(program => program.difficulty === activeDifficulty);
    }
    
    // Display filtered programs
    displayPrograms(filteredPrograms);
}

function showProgramCode(program) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('codeModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'codeModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${program.title}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <pre class="code-block"><code>${program.code}</code></pre>
                    <div class="explanation">
                        <h4>Explanation:</h4>
                        <p>${program.explanation}</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
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
    } else {
        // Update modal content
        modal.querySelector('.modal-header h3').textContent = program.title;
        modal.querySelector('.code-block code').textContent = program.code;
        modal.querySelector('.explanation p').textContent = program.explanation;
    }
    
    // Show modal
    modal.style.display = 'flex';
}
