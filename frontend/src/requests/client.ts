/* eslint-disable no-console */
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  Operation,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

let token = '';

export function setAuthorizationBearer(nextToken: string) {
  token = nextToken;
}

const request = async (operation: Operation) => {
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ZenObservable.Subscription | undefined;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const client = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(
          ({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
      }
      if (networkError)
        console.log(`[Network error]: ${networkError}`);
    }),
    createUploadLink({
      uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
    }),
  ]),
  cache: new InMemoryCache({
    dataIdFromObject: (o) => {
      return o.id
        ? `${o.__typename}-${o.id}`
        : `${o.__typename}-${o.cursor}`;
    },
  }),
});
