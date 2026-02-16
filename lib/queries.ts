// Запит для отримання всіх курсів
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

// Запит для отримання курсу за slug
export const GET_COURSE_BY_SLUG = `
  query GetCourseBySlug($slug: ID!) {
    course(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      uri
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
`;

// Запит для отримання всіх менторів
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

// Запит для отримання ментора за slug
export const GET_MENTOR_BY_SLUG = `
  query GetMentorBySlug($slug: ID!) {
    mentor(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      uri
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
`;

// Запит для отримання всіх лекцій
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
                slug
              }
            }
          }
        }
      }
    }
  }
`;

// Запит для отримання лекції за slug
export const GET_LECTURE_BY_SLUG = `
  query GetLectureBySlug($slug: ID!) {
    lecture(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      uri
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
              slug
              mentorDetails {
                position
                shortBio
              }
            }
          }
        }
      }
    }
  }
`;

// Запит для найближчої лекції (на головну)
export const GET_LATEST_LECTURE = `
  query GetLatestLecture {
    lectures(first: 1) {
      nodes {
        id
        title
        excerpt
        slug
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
                slug
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