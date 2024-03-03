# Tweety 🐤
[Work in progress ⚙️]
Tweety is a TypeScript-based helper tool designed to simplify tweet brainstorming using Langchain. This project serves as a testing ground to explore and push the limits of the hybrid framework Wasp, which has recently gained popularity in the market with templates like OpenSaas.

## Entities & About

This application leverages the Twitter API and features entities such as Tweet, TweetDraft, and GeneratedIdea.

### Code Overview

- **App Syntax**: The app syntax is utilized to define the twitterAgent application, incorporating essential details such as version, title, database setup, authentication, and dependencies.

- **Database Models**: The code defines four entities representing various concepts within the application: Tweet, TweetDraft, GeneratedIdea, and User. These entities are structured using the entity syntax and encompass properties such as id, content, createdAt, etc. Additionally, they establish relationships with each other, such as User having many Tweet, TweetDraft, and GeneratedIdea entities.

- **Client Pages & Routes**: This section of the code, although brief, outlines client pages and routes. Currently, it includes comments and a LoginPageRoute.

- **Actions**: An action named `embedIdea` is defined within the codebase. This action is imported from a server-side module located at `@server/ideas.js`. Its purpose is to modify the GeneratedIdea entity.

### Technologies Used

![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white)
![Wasp](https://img.shields.io/badge/-Wasp-563D7C?logo=wasp&logoColor=white)
![Langchain](https://img.shields.io/badge/-Langchain-FFAC45?logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white)
![OpenAPI](https://img.shields.io/badge/-OpenAPI-6C89B1?logo=openapi-initiative&logoColor=white)
![Pinecone](https://img.shields.io/badge/-Pinecone-00875A?logo=pinecone&logoColor=white)


