import {ApolloClientOptions, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {environment} from "../../../environments/environment";
import {inject} from "@angular/core";

const uri: string = environment.gitlabGraphQlUrl;

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
    },
}

export function createApollo(): ApolloClientOptions<any> {
    const httpLink: HttpLink = inject(HttpLink);

    return {
        link: httpLink.create({uri}),
        cache: new InMemoryCache(),
        defaultOptions: defaultOptions,
    };
}
