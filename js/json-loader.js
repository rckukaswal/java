// JSON loading utility for the website

class JSONLoader {
    constructor() {
        this.cache = {};
    }
    
    // Load JSON data from a file
    async load(url) {
        // Return cached data if available
        if (this.cache[url]) {
            return this.cache[url];
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Cache the data
            this.cache[url] = data;
            
            return data;
        } catch (error) {
            console.error('Error loading JSON:', error);
            throw error;
        }
    }
    
    // Clear cache for a specific URL or all URLs
    clearCache(url = null) {
        if (url) {
            delete this.cache[url];
        } else {
            this.cache = {};
        }
    }
}

// Create a global instance
window.jsonLoader = new JSONLoader();
