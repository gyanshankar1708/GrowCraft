// Enhanced Blog Writing Functionality
// Preserves original functionality while adding new features

class EnhancedBlogWriter {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.setupRichTextEditor();
    this.setupAutoSave();
    this.updatePreview();
  }

  initializeElements() {
    // Form elements
    this.form = document.getElementById('blog-form');
    this.authorInput = document.getElementById('author');
    this.titleInput = document.getElementById('title');
    this.contentEditor = document.getElementById('content-editor');
    this.contentTextarea = document.getElementById('content');
    
    // Preview elements
    this.previewSection = document.getElementById('preview-section');
    this.previewBtn = document.getElementById('preview-btn');
    this.closePreviewBtn = document.getElementById('close-preview');
    this.previewTitle = document.getElementById('preview-title');
    this.previewAuthor = document.getElementById('preview-author-name');
    this.previewDate = document.getElementById('preview-date');
    this.previewBody = document.getElementById('preview-body');
    
    // Stats elements
    this.titleCount = document.getElementById('title-count');
    this.wordCount = document.getElementById('word-count');
    this.charCount = document.getElementById('char-count');
    this.readingTime = document.getElementById('reading-time');
    
    // Other elements
    this.publishBtn = this.form.querySelector('button[type="submit"]');
    this.saveDraftBtn = document.getElementById('save-draft-btn');
    this.successModal = document.getElementById('success-modal');
    this.autosaveIndicator = document.getElementById('autosave-indicator');
    
    // Toolbar buttons
    this.toolbarBtns = document.querySelectorAll('.toolbar-btn');
  }

  setupEventListeners() {
    // Original form submission (preserved)
    this.form.onsubmit = (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    };

    // Input listeners for real-time updates
    this.authorInput.addEventListener('input', () => this.updatePreview());
    this.titleInput.addEventListener('input', () => {
      this.updateTitleCount();
      this.updatePreview();
    });
    this.contentEditor.addEventListener('input', () => {
      this.syncContent();
      this.updateStats();
      this.updatePreview();
      this.scheduleAutoSave();
    });

    // Preview functionality
    this.previewBtn.addEventListener('click', () => this.togglePreview());
    this.closePreviewBtn.addEventListener('click', () => this.togglePreview());

    // Draft saving
    this.saveDraftBtn.addEventListener('click', () => this.saveDraft());

    // Rich text toolbar
    this.toolbarBtns.forEach(btn => {
      btn.addEventListener('click', () => this.handleToolbarCommand(btn));
    });

    // Modal handlers
    document.getElementById('view-blog')?.addEventListener('click', () => {
      window.location.href = 'blogListing.html';
    });
    
    document.getElementById('write-another')?.addEventListener('click', () => {
      this.resetForm();
      this.closeSuccessModal();
    });

    // Load draft on page load
    this.loadDraft();
  }

  setupRichTextEditor() {
    // Make content editor behave like a rich text editor
    this.contentEditor.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    });

    // Handle keyboard shortcuts
    this.contentEditor.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'b':
            e.preventDefault();
            document.execCommand('bold');
            break;
          case 'i':
            e.preventDefault();
            document.execCommand('italic');
            break;
          case 'u':
            e.preventDefault();
            document.execCommand('underline');
            break;
          case 's':
            e.preventDefault();
            this.saveDraft();
            break;
        }
      }
    });
  }

  handleToolbarCommand(btn) {
    const command = btn.getAttribute('data-command');
    
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else {
      document.execCommand(command, false, null);
    }
    
    // Update active state
    this.updateToolbarState();
    this.contentEditor.focus();
    
    // Sync content and update stats
    this.syncContent();
    this.updateStats();
    this.updatePreview();
  }

  updateToolbarState() {
    this.toolbarBtns.forEach(btn => {
      const command = btn.getAttribute('data-command');
      if (document.queryCommandState(command)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  syncContent() {
    // Sync rich text editor content with hidden textarea
    this.contentTextarea.value = this.contentEditor.innerHTML;
  }

  updateTitleCount() {
    const count = this.titleInput.value.length;
    this.titleCount.textContent = count;
    
    // Add visual feedback
    if (count > 100) {
      this.titleCount.style.color = '#dc3545';
    } else if (count > 80) {
      this.titleCount.style.color = '#ffc107';
    } else {
      this.titleCount.style.color = '#28a745';
    }
  }

  updateStats() {
    const text = this.contentEditor.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const readingTime = Math.max(1, Math.ceil(words / 200)); // 200 words per minute

    this.wordCount.textContent = words;
    this.charCount.textContent = chars;
    this.readingTime.textContent = `${readingTime} min`;

    // Update character count color based on minimum requirement
    if (chars >= 100) {
      this.charCount.style.color = '#28a745';
    } else {
      this.charCount.style.color = '#dc3545';
    }
  }

  updatePreview() {
    const author = this.authorInput.value || 'Author Name';
    const title = this.titleInput.value || 'Your Blog Title';
    const content = this.contentEditor.innerHTML || 'Start typing to see your blog preview here...';
    const date = new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });

    this.previewTitle.textContent = title;
    this.previewAuthor.textContent = author;
    this.previewDate.textContent = date;
    this.previewBody.innerHTML = content;
  }

  togglePreview() {
    this.previewSection.classList.toggle('active');
    
    if (this.previewSection.classList.contains('active')) {
      this.previewBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Preview';
    } else {
      this.previewBtn.innerHTML = '<i class="fas fa-eye"></i> Preview';
    }
  }

  setupAutoSave() {
    this.autoSaveTimeout = null;
  }

  scheduleAutoSave() {
    clearTimeout(this.autoSaveTimeout);
    this.autoSaveTimeout = setTimeout(() => {
      this.autoSave();
    }, 30000); // Auto-save every 30 seconds
  }

  autoSave() {
    const draftData = {
      author: this.authorInput.value,
      title: this.titleInput.value,
      content: this.contentEditor.innerHTML,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('blogDraft', JSON.stringify(draftData));
    
    // Show auto-save indicator
    this.showAutoSaveIndicator();
  }

  saveDraft() {
    this.autoSave();
    this.showMessage('Draft saved successfully!', 'success');
  }

  loadDraft() {
    const draft = localStorage.getItem('blogDraft');
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        
        // Only load if user confirms
        if (confirm('A draft was found. Would you like to continue writing from where you left off?')) {
          this.authorInput.value = draftData.author || '';
          this.titleInput.value = draftData.title || '';
          this.contentEditor.innerHTML = draftData.content || '';
          
          this.syncContent();
          this.updateTitleCount();
          this.updateStats();
          this.updatePreview();
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }

  clearDraft() {
    localStorage.removeItem('blogDraft');
  }

  showAutoSaveIndicator() {
    this.autosaveIndicator.classList.add('active');
    setTimeout(() => {
      this.autosaveIndicator.classList.remove('active');
    }, 2000);
  }

  handleFormSubmission() {
    // Preserve original functionality
    this.syncContent(); // Ensure content is synced

    const author = this.authorInput.value;
    const title = this.titleInput.value;
    const content = this.contentTextarea.value; // Use textarea value for storage
    const date = new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });

    // Validation
    if (!author.trim() || !title.trim() || !content.trim()) {
      this.showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (content.length < 100) {
      this.showMessage('Content must be at least 100 characters long.', 'error');
      return;
    }

    // Add loading state
    this.publishBtn.classList.add('loading');
    this.publishBtn.disabled = true;

    // Simulate publishing delay for better UX
    setTimeout(() => {
      const blog = { title, author, date, content };

      // Original localStorage logic (preserved)
      let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
      blogs.push(blog);
      localStorage.setItem('blogs', JSON.stringify(blogs));

      // Clear draft
      this.clearDraft();

      // Show success modal
      this.showSuccessModal();

      // Reset loading state
      this.publishBtn.classList.remove('loading');
      this.publishBtn.disabled = false;
    }, 1500);
  }

  showSuccessModal() {
    this.successModal.classList.add('active');
  }

  closeSuccessModal() {
    this.successModal.classList.remove('active');
  }

  resetForm() {
    this.form.reset();
    this.contentEditor.innerHTML = '';
    this.syncContent();
    this.updateTitleCount();
    this.updateStats();
    this.updatePreview();
    this.clearDraft();
  }

  showMessage(message, type = 'info') {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible`;
    messageEl.innerHTML = `
      ${message}
      <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    // Insert at top of form
    this.form.insertBefore(messageEl, this.form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageEl.parentElement) {
        messageEl.remove();
      }
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedBlogWriter();
});

// Preserve original form submission for backward compatibility
document.getElementById('blog-form').onsubmit = function(e) {
  // This will be overridden by the EnhancedBlogWriter class
  // but kept here for fallback compatibility
};