import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import store from './components/redux/Store'
import App from './App.tsx'

const client = new ApolloClient({
    uri: `http://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_SERVER_PORT}/graphql`,
    credentials: 'include',
    cache: new InMemoryCache()
})
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)