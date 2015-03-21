function keyboard($document, keyCodes) {

  return {
    link: function(scope, element, attrs) {

      var keysToHandle = scope.$eval(attrs.keyboard);
      var keyHandlers  = {};
      
      // Registers key handlers
      angular.forEach(keysToHandle, function(callback, keyName){
        var keyCode = keyCodes[keyName];
        keyHandlers[keyCode] = { callback: callback, name: keyName };
      });
      
      // Bind to document keydown event
      $document.on("keydown", function(event) {
        
        var keyDown = keyHandlers[event.keyCode];
        
        // Handler is registered
        if (keyDown) {
          event.preventDefault();
          
          // Invoke the handler and digest
          scope.$apply(function() {
            keyDown.callback(keyDown.name, event.keyCode);
          })
        }
      });
    }
  };
}