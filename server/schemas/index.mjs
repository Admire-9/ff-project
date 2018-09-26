import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './typedefs';
import resolvers from './resolvers';
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

export default apolloServer;