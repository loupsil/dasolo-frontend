document.addEventListener('DOMContentLoaded', function () {
    // Declare toggleChatbot function outside of loadChatbot
    var toggleChatbot;
    var isChatbotOpen = false; // Initialize the state variable
    var style = document.createElement('style');
style.innerHTML = `
  @keyframes typingAnimation {
    0% { opacity: 0.4; }
    25% { opacity: 0.6; }
    50% { opacity: 0.8; }
    75% { opacity: 0.6; }
    100% { opacity: 0.4; }
  }
`;

document.head.appendChild(style);

    // Create a function to load the chatbot
    function loadChatbot() {
      console.log('Chatbot loadChatbot function called'); // Added log
      // Create a chatbot container element
      var chatbotContainer = document.createElement('div');
      chatbotContainer.id = 'custom-chatbot-container';

      // Add custom styles to the chatbot container (adjust as needed)
      chatbotContainer.style.position = 'fixed';
      chatbotContainer.style.bottom = '20px';
      chatbotContainer.style.right = '80px';
      chatbotContainer.style.zIndex = '1000';
      chatbotContainer.style.width = '350px';
      chatbotContainer.style.height = '500px';
      chatbotContainer.style.display = 'none';
      chatbotContainer.style.borderRadius = '10px';
      chatbotContainer.style.overflow = 'hidden';
      chatbotContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      chatbotContainer.style.border = 'none';
      chatbotContainer.style.backgroundColor = '#fff';
      chatbotContainer.style.display = 'none'; // Hide the chat initially

      // Create a chatbot header
      var header = document.createElement('div');
      header.style.backgroundColor = '#5d5d5d';
      header.style.color = 'black';
      header.style.padding = '20px';
      header.style.fontSize = '1.2em';
      header.style.fontWeight = 'bold';
      header.textContent = 'Chatbot';

      // Create a chat container for messages
      var chatMessages = document.createElement('div');
      chatMessages.style.padding = '20px';
      chatMessages.style.height = 'calc(100% - 120px)';
      chatMessages.style.overflowY = 'auto';

      var userInputContainer = document.createElement('div');
      userInputContainer.style.position = 'absolute';
      userInputContainer.style.bottom = '0';
      userInputContainer.style.left = '0';
      userInputContainer.style.right = '0';
      userInputContainer.style.padding = '10px';
      userInputContainer.style.backgroundColor = '#f1f1f1';

      var inputWrapper = document.createElement('div');
      inputWrapper.style.position = 'relative';
      inputWrapper.style.paddingRight = '50px'; // Make space for the send button

      var userInput = document.createElement('input');
      userInput.type = 'text';
      userInput.placeholder = 'Posez votre question';
      userInput.style.width = '100%';
      userInput.style.padding = '10px';
      userInput.style.border = '1px solid #ccc';
      userInput.style.borderRadius = '4px';
      userInput.style.boxSizing = 'border-box';

      var sendButton = document.createElement('button');
      sendButton.innerHTML = '&#x27A4;'; // This is the Unicode character for a rightwards arrow
      sendButton.style.position = 'absolute';
      sendButton.style.right = '5px'; // Adjusted for padding within inputWrapper
      sendButton.style.height = '100%';
      sendButton.style.backgroundColor = '#5d5d5d';
      sendButton.style.color = 'white';
      sendButton.style.border = 'none';
      sendButton.style.borderRadius = '4px';
      sendButton.style.padding = '10px';
      sendButton.style.cursor = 'pointer';
      sendButton.style.fontSize = '16px'; // Adjust the size as needed

      // Function to toggle the chatbot visibility
      toggleChatbot = function () {
        if (isChatbotOpen) {
          chatbotContainer.style.display = 'none';
          isChatbotOpen = false;
          helpButton.style.display = 'block'; // Show the "?" button when the chatbot is closed
        } else {
          chatbotContainer.style.display = 'block';
          isChatbotOpen = true;
          helpButton.style.display = 'none'; // Hide the "?" button when the chatbot is open
        }
        // Show the "?" button when the screen is large (width > 450px)
        if (window.innerWidth > 450) {
          helpButton.style.display = 'block';
        }
      };

      // Function to simulate the typing animation
      function showTypingIndicator() {
        var typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
  		var dot1 = document.createElement('span');
        dot1.textContent = '.';
        dot1.style.fontSize = '50px';
        dot1.style.animation = 'typingAnimation 1s infinite';

        var dot2 = document.createElement('span');
        dot2.textContent = '.';
        dot2.style.fontSize = '50px';
        dot2.style.animation = 'typingAnimation 1s infinite 0.33s';

        var dot3 = document.createElement('span');
        dot3.textContent = '.';
        dot3.style.fontSize = '50px';
        dot3.style.animation = 'typingAnimation 1s infinite 0.67s';

        typingIndicator.appendChild(dot1);
        typingIndicator.appendChild(dot2);
        typingIndicator.appendChild(dot3);
        
        chatMessages.appendChild(typingIndicator);
      }

      function removeTypingIndicator() {
        var typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
          chatMessages.removeChild(typingIndicator);
        }
      }

      // Event listener for the send button
      sendButton.addEventListener('click', handleUserMessage);

      // Event listener for the "Enter" key press in the input field
      userInput.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) { // 13 is the key code for "Enter"
          handleUserMessage();
        }
      });

      // Modifiez les styles du chatbotContainer pour les écrans étroits
      if (window.innerWidth < 450) {
        chatbotContainer.style.position = 'fixed';
        chatbotContainer.style.top = 'auto'; // Leave 10px margin from the top
        chatbotContainer.style.left = '10px'; // Leave 10px margin from the left
        chatbotContainer.style.right = '10px'; // Leave 10px margin from the right
        chatbotContainer.style.bottom = '10px'; // Leave 10px margin from the bottom
        chatbotContainer.style.zIndex = '1000'
        chatbotContainer.style.borderRadius = '0';
      }

      // Créez un bouton de fermeture 
        var closeButton = document.createElement('button');
        closeButton.innerHTML = '&#x2715;'; // Caractère Unicode pour une croix
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20px';
        closeButton.style.right = '10px';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', toggleChatbot);
        chatbotContainer.appendChild(closeButton);

      // Append header, chat container, user input, and send button to the chatbot container
      chatbotContainer.appendChild(header);
      chatbotContainer.appendChild(chatMessages);

      // Append the user input and send button to the input wrapper
      inputWrapper.appendChild(userInput);
      inputWrapper.appendChild(sendButton);

      // Append the input wrapper to the user input container
      userInputContainer.appendChild(inputWrapper);

      // Now append the userInputContainer to the chatbotContainer
      chatbotContainer.appendChild(userInputContainer);

      // Append the chatbot container to the body
      document.body.appendChild(chatbotContainer);

      console.log('Chatbot container created and hidden'); // Added log

      // Function to handle user messages
      function handleUserMessage() {
        var userMessageText = userInput.value;
        if (userMessageText.trim() === '') {
          return; // Do not send empty messages
        }

        var userMessage = document.createElement('div');
        userMessage.innerHTML = '<strong>Vous:</strong> ' + userMessageText; // Make "Vous" bold
        userMessage.style.marginBottom = '10px'; // Add vertical margin between messages
        chatMessages.appendChild(userMessage);

        // Show typing indicator while waiting for the response
        showTypingIndicator();

        // Send the user message to your custom ChatGPT API
        fetch('https://louis-explique-custom-chatbot-app.azurewebsites.net', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userMessage: userMessageText }),
        })
          .then(response => response.json())
          .then(data => {
            // Remove the typing indicator
            removeTypingIndicator();

            // Handle the bot's response
            var botMessage = document.createElement('div');
            botMessage.innerHTML = '<strong>Chatbot:</strong> ' + data.botResponse; // Make "Chatbot" bold
            botMessage.style.marginBottom = '10px'; // Add vertical margin between messages
            chatMessages.appendChild(botMessage);

            // You can add logic to handle more interactions here
          })
          .catch(error => {
            console.error('Error sending message to API:', error);
          });

        userInput.value = ''; // Clear the input field
      }
    }

    // Load the chatbot when the page finishes loading
    loadChatbot();

    // Create a help button to toggle chat visibility
    var helpButton = document.createElement('button');
    helpButton.textContent = '?';
    helpButton.style.position = 'fixed';
    helpButton.style.bottom = '20px';
    helpButton.style.right = '20px';
    helpButton.style.zIndex = '1001';
    helpButton.style.backgroundColor = '#5d5d5d';
    helpButton.style.color = 'white';
    helpButton.style.border = 'none';
    helpButton.style.borderRadius = '50%';
    helpButton.style.width = '40px';
    helpButton.style.height = '40px';
    helpButton.style.display = 'flex';
    helpButton.style.alignItems = 'center';
    helpButton.style.justifyContent = 'center';
    helpButton.style.padding = '0'; // Réinitialiser le padding
    helpButton.style.margin = '0'; // Réinitialiser le margin
    helpButton.style.fontSize = '25px'; // Ajuster selon la taille souhaitée
    helpButton.style.fontFamily = 'Arial, sans-serif'; // Utiliser une police standard
    helpButton.style.lineHeight = '1'; // Réduire la ligne height
    helpButton.style.textAlign = 'center';
    helpButton.style.cursor = 'pointer';
    helpButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';

    helpButton.addEventListener('click', toggleChatbot);
    document.body.appendChild(helpButton);
  });
