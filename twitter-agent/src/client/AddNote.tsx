import { useState } from "react";
import embedIdea from "@wasp/actions/embedIdea";

export default function AddNote() {
  const [idea, setIdea] = useState("");
  const [isIdeaEmbedding, setIsIdeaEmbedding] = useState(false);

  const handleEmbedIdea = async (e: any) => {
    try {
      setIsIdeaEmbedding(true);
      if (!idea) {
        throw new Error("Idea cannot be empty");
      }
      const embedIdeaResponse = await embedIdea({
        idea,
      });

      console.log("embedIdeaResponse: ", embedIdeaResponse);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIdea("");
      setIsIdeaEmbedding(false);
    }
  };

  return (
    <div className="flex flex-row gap-2 justify-center items-end w-full">
      <textarea
        autoFocus
        onChange={(e) => setIdea(e.target.value)}
        value={idea}
        placeholder="LLMs are great for brainstorming!"
        className="w-full p-4 h-22 bg-neutral-100 border rounded-lg w-full"
      />
      <button
        onClick={handleEmbedIdea}
        className="flex flex-row justify-center items-center bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 font-bold px-3 py-1 text-sm text-blue-500 whitespace-nowrap rounded-lg"
      >
        {isIdeaEmbedding ? "Loading..." : "Save Note"}
      </button>
    </div>
  );
}
