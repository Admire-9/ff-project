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
            console.log(result, "result");
            return [{id: 1, title: 'test', time: '2018-08-12', mkcontent: '这里是mk'}]
        }
    },
    Mutation: { // 对应到typeDefs中的 Mutation
        addUser: (root, args, context) => {
            return {id: 2, name: 'wenshao'};
        }
    }
}

export default resolvers;