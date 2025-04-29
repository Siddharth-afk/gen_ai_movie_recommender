import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import ReactMarkdown from "react-markdown";
import Searchbar from "./components/parts/Searchbar";
import Response from "./components/parts/Response";
import { handleChat } from "./api";

const URL = "http://127.0.0.1:11434/api/chat";

function App() {
  const [prompt, setPrompt] = useState<boolean>(false);
  const [botresponse, setResponse] = useState<string>("");
  const [history, setHistory] = useState([
    {
      role: "user",
      content:
        "You are a movie recommendation assistant. Your sole purpose is to analyze the user's prompt describing the type of movie they want to watch (e.g., based on genre, mood, actors, plot description) and return a list of relevant movie recommendations.\nYou MUST adhere to the following strict rules:\n\n1. \u00a0Output Format: Your response MUST be ONLY an array containing inner arrays. Each inner array must contain exactly two elements: the movie title as a string and the release year as an integer.\n\u00a0 \u00a0* Example of a valid response: '[['Inception', 2010], ['The Matrix', 1999], ['Blade Runner 2049', 2017]]'\n2. \u00a0Empty Results: If you cannot find any suitable movies matching the user's request, you MUST return an empty array: '[]'.\n3. \u00a0Maximum Recommendations: You MUST recommend a maximum of 10 movies. Do not exceed this number.\n4. \u00a0Content Type: You MUST only recommend feature films (movies). Do NOT recommend TV shows, miniseries, anime series, documentaries (unless they are feature-length films with theatrical releases), short films, web series, or any other format.\n5. \u00a0No Extra Text: Do NOT include any greetings, explanations, apologies, or any conversational text whatsoever. Your entire response must be the array itself (or the empty array []).\n\nAnalyze the user's next message and provide recommendations strictly following these rules.",
    },
  ]);

  async function sendHistory() {
    let response = await handleChat(history);
    console.log(response);
    setHistory((prev) => [...prev, { role: "bot", content: response }]);
  }

  if (prompt) {
    sendHistory();
    setPrompt(false);
  }

  useEffect(() => {
    async function startChat() {
      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma3:4b",
          messages: history,
          stream: false,
        }),
      };

      const response = await fetch(URL, reqOptions);
      if (response.ok) {
        let res = await response.json();
        let message = res.message.content;
        setHistory((prev) => [...prev, { role: "bot", content: message }]);
        alert("LLM Active");
      }
    }

    startChat();
  }, []);

  return (
    <>
      <div className="bg-slate-600 text-black flex w-full min-h-screen h-screen flex-col items-center justify-center p-4">
        <div className="w-full h-1/3 flex">
          <Searchbar
            setPrompt={setPrompt}
            setHistory={setHistory}
            history={history}
          />
        </div>
        <div className="w-full h-2/3 flex">
          <Response />
        </div>
      </div>
    </>
  );
}

export default App;
