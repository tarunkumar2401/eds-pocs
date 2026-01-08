export default function decorate(block) {
  const uniqueId = `autocompletesearch-${Math.random().toString(36).substr(2, 9)}`;
  
  // Get authored search icon (image) and label text
const children = [...block.children];
const authoredPicture = children[0]?.querySelector('picture');
const authoredLabel = children[1]?.textContent?.trim() || 'Search';


if (!authoredPicture) {
  console.warn('Search block: No authored search icon image found');
}

  // Create status message for screen readers
  const statusDiv = document.createElement('div');
  statusDiv.className = 'c-autocompletesearch__status';
  statusDiv.setAttribute('role', 'status');
  statusDiv.setAttribute('aria-atomic', 'true');
  statusDiv.setAttribute('aria-live', 'polite');
  
  // Create search bar container
  const searchBar = document.createElement('div');
  searchBar.className = 'sc-autocompletesearchbar';
  
  // Create open button with search icon
  const openButton = document.createElement('button');
  openButton.className = 'sc-autocompletesearchbar__btn';
  openButton.setAttribute('type', 'button');
  if (authoredPicture) {
    openButton.appendChild(authoredPicture);
  }

  // Create label
  const label = document.createElement('label');
  label.className = 'sc-autocompletesearchbar__label';
  label.setAttribute('for', `${uniqueId}__text-input`);
  label.textContent = authoredLabel;
 
  // Create text input
  const textInput = document.createElement('input');
  textInput.className = 'sc-autocompletesearchbar__text-input';
  textInput.id = `${uniqueId}__text-input`;
  textInput.name = `${uniqueId}__text-input`;
  textInput.type = 'text';
  textInput.setAttribute('aria-expanded', 'false');
  textInput.setAttribute('aria-autocomplete', 'list');
  textInput.setAttribute('autocomplete', 'off');
  textInput.setAttribute('role', 'combobox');
  
  // Create close button
  const closeButton = document.createElement('button');
  closeButton.className = 'sc-autocompletesearchbar__btn';
  closeButton.setAttribute('data-action', 'close');
  closeButton.setAttribute('aria-label', 'Clear Search Field');
  closeButton.setAttribute('tabindex', '-1');
  closeButton.setAttribute('type', 'button');
  
  const closeIcon = document.createElement('span');
  closeIcon.className = 'close-icon';
  closeButton.appendChild(closeIcon);
  
  // Assemble search bar
  searchBar.appendChild(openButton);
  searchBar.appendChild(label);
  searchBar.appendChild(textInput);
  searchBar.appendChild(closeButton);
  
  // Create autocomplete results container
  const resultsBox = document.createElement('div');
  resultsBox.id = `${uniqueId}-listbox`;
  resultsBox.className = 'sc-autocompletesearchresult sc-autocompletesearchresult--hidden';
  resultsBox.setAttribute('role', 'listbox');
  resultsBox.setAttribute('aria-label', 'Menu');
  resultsBox.setAttribute('hidden', 'true');
  
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.id = uniqueId;
  wrapper.className = 'c-autocompletesearch';
  wrapper.setAttribute('data-type', 'auto-close');
  
  wrapper.appendChild(statusDiv);
  wrapper.appendChild(searchBar);
  wrapper.appendChild(resultsBox);
  
  // Clear block and add wrapper
  block.textContent = '';
  block.appendChild(wrapper);
  
  // Search state
  let currentFocus = -1;
  
  // Fetch and filter search results
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch('/query-index.json');
      const data = await response.json();
      
      const lowerQuery = query.toLowerCase();
      
      // Filter results based on title and description
      const filtered = data.data.filter((item) => {
        const titleMatch = item.title && item.title.toLowerCase().includes(lowerQuery);
        const descMatch = item.description && item.description.toLowerCase().includes(lowerQuery);
        return titleMatch || descMatch;
      });
      
      return filtered.slice(0, 5); // Limit to 5 results
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  };
  
  // Display search results
  const displayResults = (results, query = '') => {
    resultsBox.innerHTML = '';
    
    if (results.length === 0) {
      const noResult = document.createElement('div');
      noResult.setAttribute('role', 'option');
      noResult.setAttribute('aria-disabled', 'true');
      noResult.textContent = `${query} - did not return any results.`;
      resultsBox.appendChild(noResult);
      resultsBox.classList.remove('sc-autocompletesearchresult--hidden');
      resultsBox.removeAttribute('hidden');
      return;
    }
    
    results.forEach((result, index) => {
      const option = document.createElement('div');
      option.setAttribute('role', 'option');
      option.setAttribute('data-index', index);
      option.className = 'search-result-item';
      
      const title = document.createElement('div');
      title.className = 'search-result-title';
      title.textContent = result.title || 'Untitled';
      
      option.appendChild(title);
      
      // Click handler
      option.addEventListener('click', () => {
        window.location.href = result.path;
      });
      
      // Keyboard navigation
      option.addEventListener('mouseenter', () => {
        currentFocus = index;
        updateFocus();
      });
      
      resultsBox.appendChild(option);
    });
    
    resultsBox.classList.remove('sc-autocompletesearchresult--hidden');
    resultsBox.removeAttribute('hidden');
    textInput.setAttribute('aria-expanded', 'true');
  };
  
  // Update focus styling
  const updateFocus = () => {
    const items = resultsBox.querySelectorAll('[role="option"]:not([aria-disabled="true"])');
    items.forEach((item, index) => {
      if (index === currentFocus) {
        item.setAttribute('aria-selected', 'true');
        item.classList.add('focused');
      } else {
        item.removeAttribute('aria-selected');
        item.classList.remove('focused');
      }
    });
  };
  
  // Open search function
  const openSearch = () => {
    wrapper.classList.add('c-autocompletesearch--focus');
    searchBar.classList.add('sc-autocompletesearchbar--open', 'sc-autocompletesearchbar--focus');
    openButton.style.display = 'none';
    textInput.style.display = 'block';
    closeButton.style.display = 'flex';
    closeButton.setAttribute('tabindex', '0');
    statusDiv.textContent = 'Start typing to see suggestions.';
    textInput.focus();
    textInput.setAttribute('aria-expanded', 'false');
  };
  
  // Close search function
  const closeSearch = () => {
    wrapper.classList.remove('c-autocompletesearch--focus');
    searchBar.classList.remove('sc-autocompletesearchbar--open', 'sc-autocompletesearchbar--focus');
    openButton.style.display = 'flex';
    textInput.style.display = 'none';
    closeButton.style.display = 'none';
    closeButton.setAttribute('tabindex', '-1');
    textInput.value = '';
    textInput.setAttribute('aria-expanded', 'false');
    statusDiv.textContent = '';
    resultsBox.classList.add('sc-autocompletesearchresult--hidden');
    resultsBox.setAttribute('hidden', 'true');
    resultsBox.innerHTML = '';
    currentFocus = -1;
  };
  
  // Event listeners
  openButton.addEventListener('click', openSearch);
  closeButton.addEventListener('click', closeSearch);
  
  // Close on Escape key and handle arrow navigation
  textInput.addEventListener('keydown', (e) => {
    const items = resultsBox.querySelectorAll('[role="option"]:not([aria-disabled="true"])');
    
    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        currentFocus = currentFocus < items.length - 1 ? currentFocus + 1 : 0;
        updateFocus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        currentFocus = currentFocus > 0 ? currentFocus - 1 : items.length - 1;
        updateFocus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFocus > -1 && items[currentFocus]) {
        items[currentFocus].click();
      } else {
        const query = textInput.value.trim();
        if (query) {
          window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
      }
    }
  });
  
  // Handle input changes (for autocomplete functionality)
  let debounceTimer;
  textInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    
    // Clear previous timer
    clearTimeout(debounceTimer);
    
    if (query.length >= 3) {
      statusDiv.textContent = 'Searching...';
      
      // Debounce search
      debounceTimer = setTimeout(async () => {
        const searchResults = await fetchSearchResults(query);
        displayResults(searchResults, query);
        
        if (searchResults.length > 0) {
          statusDiv.textContent = `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found for ${query}.`;
        } else {
          statusDiv.textContent = `${query} - did not return any results.`;
        }
      }, 300);
    } else if (query.length === 0) {
      resultsBox.classList.add('sc-autocompletesearchresult--hidden');
      resultsBox.setAttribute('hidden', 'true');
      resultsBox.innerHTML = '';
      textInput.setAttribute('aria-expanded', 'false');
      statusDiv.textContent = 'Start typing to see suggestions.';
      currentFocus = -1;
    } else {
      resultsBox.classList.add('sc-autocompletesearchresult--hidden');
      resultsBox.setAttribute('hidden', 'true');
      textInput.setAttribute('aria-expanded', 'false');
      statusDiv.textContent = 'Start typing to see suggestions.';
    }
  });
}
