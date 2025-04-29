const URL = "http://127.0.0.1:11434/api/chat";

export async function handleChat(history: any) {
  console.log(history);

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
    let message = res.message.content.replace(/```json|```/g, "");

    return message;
  }

  /* if (response.ok && response.body) {
        console.log(history);
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
          //setResponse((prev) => prev + JSON.parse(decodeChunk).message.content);
        }
      } */
}

/*  const handleSubmit = async () => {
    if (description.current && description.current.value !== "") {
      const text = description.current.value;
      setHistory((prev) => [...prev, { role: "user", content: text }]);

      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma3:4b",
          messages: history,
        }),
      };

      const response = await fetch(URL, reqOptions);

      if (response.ok && response.body) {
        console.log(history);
        description.current.value = "";
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
          setResponse((prev) => prev + JSON.parse(decodeChunk).message.content);
        }
        setHistory((prev) => [...prev, { role: "bot", content: botresponse }]);
      }
    }
  }; */
