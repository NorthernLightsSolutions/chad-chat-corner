
(function() {
  // Create iframe for the chat widget
  function createChatWidget() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://lovable.dev/projects/1a590242-4722-4b44-9d8c-4c031e15e60e';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.left = '20px';
    iframe.style.zIndex = '999999';
    iframe.style.border = 'none';
    iframe.style.width = '350px';  
    iframe.style.height = '480px'; 
    iframe.style.overflow = 'hidden';
    iframe.style.pointerEvents = 'auto';
    iframe.style.background = 'transparent';
    
    // Add transition for smooth animations
    iframe.style.transition = 'all 0.3s ease-in-out';
    
    // Initially hide the iframe (will be shown when chat button is clicked)
    iframe.style.opacity = '0';
    iframe.style.visibility = 'hidden';
    iframe.style.transform = 'scale(0.9)';
    
    iframe.setAttribute('title', 'Chat with Northern Lights');
    iframe.setAttribute('loading', 'lazy');
    
    document.body.appendChild(iframe);
    
    return iframe;
  }
  
  // Create a chat button
  function createChatButton() {
    const button = document.createElement('button');
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.width = '60px';
    button.style.height = '60px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = '#4f46e5';
    button.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.zIndex = '999999';
    button.style.transition = 'all 0.3s ease';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.outline = 'none';
    
    // Add chat icon
    const icon = document.createElement('div');
    icon.style.width = '100%';
    icon.style.height = '100%';
    icon.style.borderRadius = '50%';
    icon.style.background = 'url("https://lovable.dev/projects/1a590242-4722-4b44-9d8c-4c031e15e60e/public/lovable-uploads/6cdee4f9-131b-48b9-9758-0bfceaf3ec67.png") no-repeat center center';
    icon.style.backgroundSize = 'cover';
    
    // Add "Chat with me" text overlay
    const textOverlay = document.createElement('div');
    textOverlay.style.position = 'absolute';
    textOverlay.style.top = '0';
    textOverlay.style.left = '0';
    textOverlay.style.width = '100%';
    textOverlay.style.height = '100%';
    textOverlay.style.display = 'flex';
    textOverlay.style.flexDirection = 'column';
    textOverlay.style.alignItems = 'center';
    textOverlay.style.justifyContent = 'center';
    textOverlay.style.fontSize = '10px';
    textOverlay.style.color = 'white';
    textOverlay.style.fontWeight = 'bold';
    textOverlay.style.textShadow = '1px 1px 1px black';
    textOverlay.innerHTML = '<span>Chad</span><span>with me</span>';
    
    button.appendChild(icon);
    button.appendChild(textOverlay);
    
    // Hover effect - using function reference instead of string
    button.onmouseover = function() {
      this.style.transform = 'scale(1.1)';
    };
    button.onmouseout = function() {
      this.style.transform = 'scale(1)';
    };
    
    document.body.appendChild(button);
    
    return button;
  }
  
  // Initialize function - CSP friendly
  function initializeWidget() {
    const chatWidget = createChatWidget();
    const chatButton = createChatButton();
    let isOpen = false;
    
    // Show chat widget when button is clicked
    chatButton.addEventListener('click', function() {
      isOpen = !isOpen;
      
      if (isOpen) {
        // Show chat widget
        chatWidget.style.opacity = '1';
        chatWidget.style.visibility = 'visible';
        chatWidget.style.transform = 'scale(1)';
        // Hide chat button when widget is open
        chatButton.style.opacity = '0';
        chatButton.style.visibility = 'hidden';
      } else {
        // Hide chat widget
        chatWidget.style.opacity = '0';
        chatWidget.style.visibility = 'hidden';
        chatWidget.style.transform = 'scale(0.9)';
        // Show chat button when widget is closed
        chatButton.style.opacity = '1';
        chatButton.style.visibility = 'visible';
      }
    });
    
    // Handle messages from iframe
    window.addEventListener('message', function(event) {
      if (event.origin === 'https://lovable.dev') {
        if (event.data === 'close-chat') {
          // Close chat widget
          isOpen = false;
          chatWidget.style.opacity = '0';
          chatWidget.style.visibility = 'hidden';
          chatWidget.style.transform = 'scale(0.9)';
          chatButton.style.opacity = '1';
          chatButton.style.visibility = 'visible';
        }
      }
    });
  }
  
  // Initialize when the DOM is fully loaded - using direct function instead of eval
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWidget);
  } else {
    // If DOM is already loaded, initialize immediately
    initializeWidget();
  }
})();
