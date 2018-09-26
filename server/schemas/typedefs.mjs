import { gql } from 'apollo-server-koa';

const typeDefs = gql`
    type User{
        id:Int!,
        name:String!
    }
    type Article{
        id:Int!,
        title: String!,
        time: String!,
        mkcontent: String!
    }
    type Query {
        users: [User],
        article: [Article]
    }
    type Mutation {
        addUser(name:String!):User
    }
`;

export default typeDefs;