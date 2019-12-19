import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import Books from './Todos'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

const App: React.FC = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Books />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
