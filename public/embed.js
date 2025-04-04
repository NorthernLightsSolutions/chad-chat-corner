
(function() {
  // Create iframe for the chat widget
  function createChatWidget() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://lovable.dev/projects/1a590242-4722-4b44-9d8c-4c031e15e60e';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = '9999';
    iframe.style.border = 'none';
    iframe.style.width = '380px';  // Slightly larger than the widget to account for any margins
    iframe.style.height = '580px'; // Taller than the widget to account for expansion
    iframe.style.overflow = 'hidden';
    iframe.style.pointerEvents = 'auto';
    
    // Initially just show the button, not the full chat
    iframe.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(iframe);
    
    return iframe;
  }
  
  // Initialize when the DOM is fully loaded
  window.addEventListener('DOMContentLoaded', function() {
    const chatWidget = createChatWidget();
    
    // You can add message passing between the parent site and iframe if needed
    window.addEventListener('message', function(event) {
      if (event.origin === 'https://lovable.dev') {
        // Handle messages from the iframe if needed
        console.log('Message from chat widget:', event.data);
      }
    });
  });
})();
