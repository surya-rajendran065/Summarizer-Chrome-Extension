/*

This javascript file is used to hold a async
function that summarizes the content of a webpage
by going to another server and getting the summarization

*/

// Summarizes the content of a webpage
async function summarizeContent() {
    // Endpoint 1 - Weak extractive summarization to avoid rate limits
    let endpoint =
        "https://summary-chrome-extension-backend.onrender.com/simple-sum";

    // Endpoint 2 - Strong AI summarization with OpenAI
    let endpoint2 =
        "https://summary-chrome-extension-backend.onrender.com/ai-sum";

    // Fetch from server
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: document.body.innerText }),
    });

    // Response
    const data = await response.json();

    // data.summary is the summary
    summarizedContent = data.summary;

    // Debugging
    console.log(summarizedContent);

    return data.summary;
}
