import axios from 'axios';

const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql';

interface GraphQLResponse<T = any> {
    data?: T;
    errors?: Array<{
        message: string;
        locations?: Array<{ line: number; column: number }>;
        path?: string[];
    }>;
}

export class GraphQLClient {
    static async query<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
        try {
            const response = await axios.post<GraphQLResponse<T>>(
                GRAPHQL_ENDPOINT,
                {
                    query,
                    variables
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.errors) {
                const errorMessage = response.data.errors.map(error => error.message).join(', ');
                throw new Error(`GraphQL Error: ${errorMessage}`);
            }

            if (!response.data.data) {
                throw new Error('No data returned from GraphQL query');
            }

            return response.data.data;
        } catch (error) {
            console.error('GraphQL query error:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    throw new Error(`GraphQL Server Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
                } else if (error.request) {
                    throw new Error('Network error: Unable to connect to GraphQL server');
                } else {
                    throw new Error(error.message || 'GraphQL query failed');
                }
            } else {
                throw new Error(error instanceof Error ? error.message : 'GraphQL query failed');
            }
        }
    }

    static async mutation<T = any>(mutation: string, variables?: Record<string, any>): Promise<T> {
        return this.query<T>(mutation, variables);
    }
}