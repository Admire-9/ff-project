import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
const httpLink = new HttpLink({
    // 你需要在这里使用绝对路径
    uri: 'http://localhost:3003/graphql',
});

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    addTypename: false,
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

export default apolloProvider;