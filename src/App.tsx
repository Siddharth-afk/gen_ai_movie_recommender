import React, { useRef, useState } from "react";
import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import ReactMarkdown from "react-markdown";

const URL = "http://127.0.0.1:11434/api/generate";

function App() {
  const description = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async () => {
    if (description.current && description.current.value !== "") {
      setResponse("");
      const text = description.current.value;

      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma3:4b",
          prompt: text,
        }),
      };

      const response = await fetch(URL, reqOptions);

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let loop = true;

        while (loop) {
          const { done, value } = await reader.read();

          if (done) {
            loop = false;
            break;
          }

          const decodeChunk = decoder.decode(value, { stream: true });
          setResponse((prev) => prev + JSON.parse(decodeChunk).response);
        }
      }
    }
  };

  return (
    <>
      <div className="bg-slate-600 text-black flex w-full min-h-screen flex-col items-center justify-center">
        <div className="w-5/6 gap-2 flex flex-col">
          <p>What do you want to watch?</p>
          <Input
            type="text"
            placeholder="Describe what you want to watch?"
            className="outline-none focus:border-none focus-visible:ring-[2px]"
            ref={description}
          />
          <Button className="w-fit mx-auto" onClick={handleSubmit}>
            Submit
          </Button>
          <div className="w-4/5 flex h-fit flex-col check_list">
            <ReactMarkdown children={response} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
