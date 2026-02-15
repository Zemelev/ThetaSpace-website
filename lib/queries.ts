export const GET_LATEST_LECTURE = `
  query GetLatestLecture {
    lectures(first: 1) {
      nodes {
        id
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        lectureDetails {
          dateTime
          location
          price
          lecturerName {
            nodes {
              ... on Mentor {
                id
                title
                mentorDetails {
                  position
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_LECTURES = `
  query GetAllLectures {
    lectures(first: 10) {
      nodes {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        lectureDetails {
          dateTime
          location
          price
          lecturerName {
            nodes { 
              ... on Mentor {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_COURSES = `
  query GetAllCourses {
    courses(first: 10) {
      nodes {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        courseDetails {
          duration
          coursePrice
          format
          includes
        }
      }
    }
  }
`;

export const GET_ALL_MENTORS = `
  query GetAllMentors {
    mentors(first: 10) {
      nodes {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        mentorDetails {
          position
          shortBio
          socialLinks
        }
      }
    }
  }
`;