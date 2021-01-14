import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import client from './client'
import { RecoilRoot } from 'recoil'
import './styles/index.css'

ReactDOM.render(
  <RecoilRoot>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </RecoilRoot>,
  document.getElementById('root')
)
