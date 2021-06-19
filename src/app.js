import mongoose from 'mongoose'
import cors from 'cors';
import dotEnv from 'dotenv'
import http from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';
import schema from './graphql/schema'
import express from 'express';

dotEnv.config();
const port = process.env.PORT || 3000;
const pubsub = new PubSub(); //  Use Memory caching like Redis when using Production
const app = express();

// Cors
app.use(cors({
    origin: '*', // Be sure to switch to your production domain
    optionsSuccessStatus: 200
}));

// Routes
app.get('/api/status', (req, res) => {
    res.send({ status: 'ok' });
});

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
        pubsub,
        req
    }),
    subscriptions: {
        onConnect: () => console.log('🕸️ Client connected  to websocket'),
        onDisconnect: (webSocket, context) => {
            console.log('Client disconnected from websocket')
        },
    },

});

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => console.log(`🖥️  Connected to ${process.env.MONGO_URI}`))


server.applyMiddleware({ app })

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
    console.log(`🚀 Apollo Server Server ready at http://localhost:${port}${server.graphqlPath}`)
})


export default server;

