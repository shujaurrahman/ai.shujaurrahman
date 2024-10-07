<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Ask AI</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
  <style>
    .error-text {
      color: #fff;
      padding: 10px 10px;
      text-align: center;
      border-radius: 5px;
      background: #6b44e0;
      border: 1px solid #f5c6cb;
      margin-bottom: 20px;
      display: none;
    }

    /* Chatbox styling */
    .chat-box {
      display: flex;
      flex-direction: column;
      max-height: 500px;
      overflow-y: auto;
    }

    /* AI message styling */
    .message.ai {
      align-self: flex-start;
      background-color: #e5e5ea;
      color: #000;
      padding: 10px;
      border-radius: 10px;
      margin: 10px;
      text-align: justify;

    }

    /* User message styling */
    .message.user {
      align-self: flex-end;
      background-color: #6b44e0;
      color: #fff;
      padding: 10px;
      border-radius: 10px;
      margin: 10px;
      max-width: 60%;
    }

    /* Initial message hidden by default */
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <section class="chat-area">
      <header>
        <a href="https://shujaurrahman.me" class="back-icon"><i class="fas fa-arrow-left"></i></a>
        <img src="ai.jpg" alt="AI avatar">
        <div class="details">
          <span>Ask AI about</span>
          <p>shujaurrahman</p>
        </div>
        <button type='submit' onclick='clearChat()' class='logout'>Clear Chat</button>
      </header>

      <div class="chat-box">
        <div class="text">No messages are available. Once you send a message, they will appear here.</div>
      </div>
      
      <form action="#" class="typing-area" enctype="multipart/form-data">
        <input type="text" name="message" class="input-field" placeholder="Type a message here..." autocomplete="off">
        <button><i class="fab fa-telegram-plane"></i></button>
      </form>
    </section>
  </div>

  <script src="script.js"></script>
</body>
