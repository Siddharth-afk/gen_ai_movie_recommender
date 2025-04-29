import { FormEvent, FormEventHandler, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ReactFormState } from "react-dom/client";
import { handleChat } from "@/api";

const Searchbar = ({ setPrompt, setHistory, sendHistory }: any) => {
  const description = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (description.current != null) {
      setHistory((prev: any) => [
        ...prev,
        {
          role: "user",
          content: description.current && description.current.value,
        },
      ]);
    }
    setPrompt(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col items-center justify-center gap-4"
    >
      <p>What do you want to watch?</p>
      <Input
        type="text"
        placeholder="Describe what you want to watch?"
        className="outline-none focus:border-none focus-visible:ring-[2px]"
        name="prompt"
        ref={description}
      />
      <Button className="w-fit mx-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Searchbar;
