const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_WP_GRAPHQL_URL is not defined');
}

const GRAPHQL_ENDPOINT: string = endpoint;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string; locations?: unknown; path?: unknown }>;
}

export async function fetchGraphQL<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json() as GraphQLResponse<T>;

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error(json.errors[0]?.message || 'GraphQL error');
    }

    return json.data;
  } catch (error) {
    console.error('Fetch GraphQL error:', error);
    throw error;
  }
}

export async function testGraphQLConnection() {
  try {
    const testQuery = `{ __typename }`;
    await fetchGraphQL(testQuery);
    console.log('GraphQL connection successful');
    return true;
  } catch (error) {
    console.error('GraphQL connection failed:', error);
    return false;
  }
}
