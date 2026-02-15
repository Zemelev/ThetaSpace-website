export async function GET() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            {
              posts(first: 3) {
                nodes {
                  id
                  title
                  excerpt
                }
              }
              lectures(first: 3) {
                nodes {
                  id
                  title
                  lectureDetails {
                    dateTime
                    location
                  }
                }
              }
            }
          `,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        data: data.data,
        errors: data.errors,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('GraphQL test error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        endpoint: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}