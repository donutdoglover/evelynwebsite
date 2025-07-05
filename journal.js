
// Display current date in journal
function displayJournalDate() {
  const today = new Date();
  const options = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', options);
  document.getElementById('journal-date').textContent = formattedDate;
}

// Handle mood selection
function initializeMoodSelection() {
  const moodEmojis = document.querySelectorAll('.mood-emoji');
  
  moodEmojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      // Remove selected class from all emojis
      moodEmojis.forEach(e => e.classList.remove('selected'));
      // Add selected class to clicked emoji
      emoji.classList.add('selected');
      
      // Save mood to localStorage (optional)
      const mood = emoji.dataset.mood;
      const today = new Date().toDateString();
      localStorage.setItem(`mood-${today}`, mood);
    });
  });
  
  // Load saved mood for today
  const today = new Date().toDateString();
  const savedMood = localStorage.getItem(`mood-${today}`);
  if (savedMood) {
    const savedEmoji = document.querySelector(`[data-mood="${savedMood}"]`);
    if (savedEmoji) {
      savedEmoji.classList.add('selected');
    }
  }
}

// Auto-save journal entries
function initializeAutoSave() {
  const textareas = document.querySelectorAll('.journal-textarea');
  
  textareas.forEach((textarea, index) => {
    const today = new Date().toDateString();
    const storageKey = `journal-entry-${index}-${today}`;
    
    // Load saved content
    const savedContent = localStorage.getItem(storageKey);
    if (savedContent) {
      textarea.value = savedContent;
    }
    
    // Save on input
    textarea.addEventListener('input', () => {
      localStorage.setItem(storageKey, textarea.value);
    });
  });
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', () => {
  displayJournalDate();
  initializeMoodSelection();
  initializeAutoSave();
});
