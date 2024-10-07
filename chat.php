<?php

require 'vendor/autoload.php';  // Include the dotenv package
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Access the API key from the .env file
$api_key = $_ENV['HUGGING_FACE_API_KEY'];
$api_url = 'https://api-inference.huggingface.co/v1/chat/completions'; // Update if needed

// Load your complete JSON data from file (context)
$json_data = file_get_contents('combined.json');

// Get the user's message from the POST request
$user_message = strtolower(trim($_POST['message'])); // Make the message lowercase for simple matching

// Handle special case for greeting like "hi"
if (in_array($user_message, ['hi', 'hello', 'hey'])) {
    // Custom greeting response for "hi" messages
    echo json_encode(["message" => "Hey, I am Shujaur Rahman AI! How can I assist you today?"]);
    exit;
}

// Prepare the data to send to the API
$data = [
    "model" => "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "messages" => [
        // A system message to instruct the AI to provide concise responses
        ["role" => "system", "content" => "You are an AI model based on Shujaur Rahman. Provide responses that are concise, precise, and between 20 to 30 words, utilizing the context effectively."],
        ["role" => "user", "content" => $user_message . "\n\nContext: " . $json_data] // Combining user message and context
    ]
];

// Use cURL to send the request to the Hugging Face API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Encode data to JSON
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $api_key,
    'Content-Type: application/json'
]);

// Capture cURL response and error
$response = curl_exec($ch);
$curl_error = curl_error($ch);  // Check if there is any cURL error
curl_close($ch);

// Check if the response was successful and contains the expected structure
$decoded_response = json_decode($response, true);

// Handle the response
if (isset($decoded_response['choices'][0]['message']['content'])) {
    $cleaned_response = trim($decoded_response['choices'][0]['message']['content']);
    echo json_encode(["message" => $cleaned_response]); // Return only the relevant text response
} else {
    // Print a custom error message with the API's returned response
    $error_message = isset($decoded_response['error']) ? htmlspecialchars($decoded_response['error']) : "Unknown error occurred.";
    echo json_encode(["message" => "Sorry, I could not generate a response. Error Details: " . $error_message]);
}

?>
