/* import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
// import { typeDefs } from './graphql/schema.js';
// import { resolvers } from './graphql/resolvers.js';
// import { typeDefs } from './domain/users/presentation/userSchema.js';
// import { resolvers } from './domain/users/presentation/userResolvers.js';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
// import { typeDefs, resolvers } from './graphql/index.js';
import { connectToDatabase } from './infrastructure/database/connections.js';
async function startApolloServer() {
  const app = express();
  connectToDatabase();
  const server = new ApolloServer({ typeDefs, resolvers });

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  app.use(
    '/graphql',
    cors<cors.CorsRequest>() as unknown as express.RequestHandler, // Double type assertion
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    }),
  );

  // Optional: Simple endpoint for testing
  app.get('/', (req, res) => {
    res.send('Express server is running!');
  });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Express Server:   http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

startApolloServer(); */import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './infrastructure/database/connections.js';

// Import your REST controllers
import {
  getFlashcards,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from './domain/cards/presentation/cardResolvers.js';

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json()); // Instead of bodyParser, express has built-in json parser now

// REST API routes for flashcards
app.get('/api/flashcards', getFlashcards);
app.get('/api/flashcards/:id', getFlashcardById);
app.post('/api/flashcards', createFlashcard);
app.put('/api/flashcards/:id', updateFlashcard);
app.delete('/api/flashcards/:id', deleteFlashcard);

// You can add other REST routes (users, etc.) here similarly

// Simple test endpoint
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

