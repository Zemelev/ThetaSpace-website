const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_WP_GRAPHQL_URL is not defined');
}

const GRAPHQL_ENDPOINT: string = endpoint;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string; locations?: any; path?: any }>;
}

export async function fetchGraphQL<T = any>(
  query: string, 
  variables: Record<string, any> = {}
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
      next: { revalidate: 60 }, // Кешування на 60 секунд
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

// Додаткова функція для перевірки з'єднання
export async function testGraphQLConnection() {
  try {
    const testQuery = `{ __typename }`;
    await fetchGraphQL(testQuery);
    console.log('✅ GraphQL connection successful');
    return true;
  } catch (error) {
    console.error('❌ GraphQL connection failed:', error);
    return false;
  }
}


// for js
// import { GraphQLClient } from 'graphql-request';

// const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

// if (!endpoint) {
//   throw new Error('NEXT_PUBLIC_WP_GRAPHQL_URL is not defined');
// }

// const client = new GraphQLClient(endpoint, {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Основні GraphQL запити
// export const queries = {
//   // Запит для отримання лекцій
//   GET_LECTURES: `
//     query GetLectures {
//       lectures(first: 100) {
//         nodes {
//           id
//           title
//           excerpt
//           featuredImage {
//             node {
//               sourceUrl
//               altText
//             }
//           }
//           lectureDetails {
//             dateTime
//             location
//             price
//             status
//             lecturerName {
//               node {
//                 ... on Mentor {
//                   id
//                   title
//                   mentorDetails {
//                     position
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `,

//   // Запит для отримання курсів
//   GET_COURSES: `
//     query GetCourses {
//       courses(first: 100) {
//         nodes {
//           id
//           title
//           excerpt
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//           courseDetails {
//             duration
//             coursePrice
//             format
//             includes
//           }
//         }
//       }
//     }
//   `,

//   // Запит для отримання менторів
//   GET_MENTORS: `
//     query GetMentors {
//       mentors(first: 100) {
//         nodes {
//           id
//           title
//           excerpt
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//           mentorDetails {
//             position
//             shortBio
//             experience
//             specialization
//             socialLinks
//           }
//         }
//       }
//     }
//   `,

//   // Запит для отримання однієї лекції
//   GET_LECTURE_BY_ID: `
//     query GetLectureById($id: ID!) {
//       lecture(id: $id, idType: DATABASE_ID) {
//         id
//         title
//         content
//         featuredImage {
//           node {
//             sourceUrl
//             altText
//           }
//         }
//         lectureDetails {
//           dateTime
//           location
//           price
//           status
//           maxAttendees
//           registered
//           lecturerName {
//             node {
//               ... on Mentor {
//                 id
//                 title
//                 mentorDetails {
//                   position
//                   shortBio
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `,
// };

// // Функція для виконання запитів
// export async function fetchGraphQL(query, variables = {}) {
//   try {
//     return await client.request(query, variables);
//   } catch (error) {
//     console.error('GraphQL Error:', error);
//     throw error;
//   }
// }

// export default client;