function navigator() {
    if ('navigation' in window) {
        navigation.addEventListener('navigate', (event) => {
          // Check if this navigation should be intercepted
          if (shouldNotIntercept(event)) return;
      
          // Your custom logic here
          console.log('Navigation occurred:', event);
      
          // Optionally, prevent the default navigation behavior
          // event.preventDefault();
        });
      }
}
