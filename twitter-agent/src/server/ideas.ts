import type { EmbedIdea } from "@wasp/actions/types";
import type { GeneratedIdea } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();
export const initPinecone = async () => {
  await pinecone.init({
    environment: process.env.PINECONE_ENV!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
  return pinecone;
};

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

/**
 * Embeds a single idea into the vector store
 */
export const embedIdea: EmbedIdea<{ idea: string }, GeneratedIdea> = async (
  { idea },
  context
) => {
  if (!context.user) {
    throw new HttpError(401, "User is not authorized");
  }

  console.log("idea: ", idea);

  try {
    let newIdea = await context.entities.GeneratedIdea.create({
      data: {
        content: idea,
        userId: context.user.id,
      },
    });

    if (!newIdea) {
      throw new HttpError(404, "Idea not found");
    }

    const pinecone = await initPinecone();

    // we need to create an index to save the vector embeddings to
    // an index is similar to a table in relational database world
    const availableIndexes = await pinecone.listIndexes();
    if (!availableIndexes.includes("embeds-test")) {
      console.log("creating index");
      await pinecone.createIndex({
        createRequest: {
          name: "embeds-test",
          // open ai uses 1536 dimensions for their embeddings
          dimension: 1536,
        },
      });
    }

    const pineconeIndex = pinecone.Index("embeds-test");

    // the LangChain vectorStore wrapper
    const vectorStore = new PineconeStore(embeddings, {
      pineconeIndex: pineconeIndex,
      namespace: context.user.username,
    });

    // create a document with the idea's content to be embedded
    const ideaDoc = new Document({
      metadata: { type: "note" },
      pageContent: newIdea.content,
    });

    // add the document to the vectore store along with its id
    await vectorStore.addDocuments([ideaDoc], [newIdea.id.toString()]);

    newIdea = await context.entities.GeneratedIdea.update({
      where: {
        id: newIdea.id,
      },
      data: {
        isEmbedded: true,
      },
    });
    console.log("idea embedded successfully!", newIdea);
    return newIdea;
  } catch (error: any) {
    throw new Error(error);
  }
};
