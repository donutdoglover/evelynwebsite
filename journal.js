
// Your Replit username - replace this with your actual username
const OWNER_USERNAME = 'evelyn.annettej@gmail.com'; // Replace with your actual Replit username

let isOwner = false;
let currentUser = null;

// Check authentication status
function checkAuth() {
  // In a real Replit environment, these headers would be available
  // For now, we'll simulate with a prompt for demonstration
  const replitUserName = prompt('Enter your Replit username to test authentication (or cancel to view as visitor):');

  if (replitUserName) {
    currentUser = replitUserName;
    isOwner = (replitUserName === OWNER_USERNAME);
    updateAuthStatus();
    setupJournalInterface();
  } else {
    // Visitor mode
    currentUser = null;
    isOwner = false;
    updateAuthStatus();
    setupJournalInterface();
  }
}

// Update authentication status display
function updateAuthStatus() {
  const authStatus = document.getElementById('auth-status');
  const authLogin = document.getElementById('auth-login');

  if (currentUser) {
    if (isOwner) {
      authStatus.innerHTML = `<span class="auth-status">✨ Welcome back! You can edit your journal ✨</span>`;
    } else {
      authStatus.innerHTML = `<span class="auth-status">👋 Hello ${currentUser}! You're viewing in read-only mode</span>`;
    }
    authLogin.style.display = 'none';
  } else {
    authStatus.innerHTML = `<span class="auth-status">📖 Viewing journal as a visitor (read-only)</span>`;
    authLogin.style.display = 'block';
  }
}

// Setup journal interface based on permissions
function setupJournalInterface() {
  const thoughtsTextarea = document.getElementById('thoughts-textarea');
  const thoughtsContent = document.getElementById('thoughts-content');
  const amazingTextarea = document.getElementById('amazing-textarea');
  const amazingContent = document.getElementById('amazing-content');
  const moodEmojis = document.querySelectorAll('.mood-emoji');

  if (isOwner) {
    // Owner can edit
    thoughtsTextarea.style.display = 'block';
    thoughtsContent.style.display = 'none';
    amazingTextarea.style.display = 'block';
    amazingContent.style.display = 'none';

    // Enable mood selection
    moodEmojis.forEach(emoji => {
      emoji.style.cursor = 'pointer';
      emoji.style.opacity = '1';
    });

    initializeAutoSave();
    initializeMoodSelection();
  } else {
    // Visitors see read-only content
    thoughtsTextarea.style.display = 'none';
    thoughtsContent.style.display = 'block';
    amazingTextarea.style.display = 'none';
    amazingContent.style.display = 'block';

    // Disable mood selection
    moodEmojis.forEach(emoji => {
      emoji.style.cursor = 'default';
      emoji.style.opacity = '0.7';
    });

    loadReadOnlyContent();
  }
}

// Load content for read-only viewing
function loadReadOnlyContent() {
  const today = new Date().toDateString();

  // Load thoughts content
  const thoughtsContent = localStorage.getItem(`journal-entry-0-${today}`) || 'No thoughts shared for today.';
  document.getElementById('thoughts-content').textContent = thoughtsContent;

  // Load amazing things content
  const amazingContent = localStorage.getItem(`journal-entry-1-${today}`) || 'No amazing things shared for today.';
  document.getElementById('amazing-content').textContent = amazingContent;

  // Load mood
  const savedMood = localStorage.getItem(`mood-${today}`);
  const moodDisplay = document.getElementById('selected-mood');
  if (savedMood) {
    const moodEmoji = document.querySelector(`[data-mood="${savedMood}"]`);
    if (moodEmoji) {
      moodDisplay.textContent = `Today's mood: ${moodEmoji.textContent}`;
    }
  } else {
    moodDisplay.textContent = 'No mood shared for today.';
  }
}

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

// Handle mood selection (only for owner)
function initializeMoodSelection() {
  if (!isOwner) return;

  const moodEmojis = document.querySelectorAll('.mood-emoji');

  moodEmojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      // Remove selected class from all emojis
      moodEmojis.forEach(e => e.classList.remove('selected'));
      // Add selected class to clicked emoji
      emoji.classList.add('selected');

      // Save mood to localStorage
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

// Auto-save journal entries (only for owner)
function initializeAutoSave() {
  if (!isOwner) return;

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
  checkAuth();
});
