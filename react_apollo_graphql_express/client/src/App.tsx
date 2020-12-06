import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import apollo from './apollo';

const App: FC = () => {
  return (
    <ApolloProvider client={apollo}>
      <span>hello</span>
    </ApolloProvider>
  );
};

export default App;
