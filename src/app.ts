import express from 'express';

const app = express();
// Subindo a aplicação
app.use(express.json());

export default app;
