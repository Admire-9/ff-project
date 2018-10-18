import { gql } from 'apollo-server-koa';

const typeDefs = gql`
    input ArticleInput {
        title: String,
        time: String,
        tag: String,
        sort: String,
        overview: String,
        mkcontent: String,
    }
    type Success{
        code: Int!,
        message: String!
    }
    type User{
        id: String!,
        name:String!
    }
    type Article{
        id:String!,
        title: String,
        time: String,
        tag: String,
        sort: String,
        overview: String,
        mkcontent: String,
    }
    type Query {
        users: [User],
        article(id: String, sort: String): [Article]
        articleList: [Article]
    }
    type Mutation {
        addUser(name:String!):User,
        updateArticle(id: String, articleInput: ArticleInput, type: String!): Success,
        delArticle(id: String!): Success
    }
`;

export default typeDefs;