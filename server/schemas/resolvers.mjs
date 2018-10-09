import sqlBehavior from '../lib/mysql';

const test = () => {
    return new Promise((resolve, reject) => {
        resolve(1);
    });
}

const resolvers = {
    Query: {    // 对应到typeDefs中的 type Query
        users: async(root, args, context) => {
            let i = await test();
            return [{id: i, name: 'wenshao111'}];
        },
        article: async(root, args, context) => {
            let result = await sqlBehavior.findArticle(args.id);
            return result;
        }
    },
    Mutation: { // 对应到typeDefs中的 Mutation
        addUser: (root, args, context) => {
            return {id: 2, name: 'wenshao'};
        }
    }
}

export default resolvers;