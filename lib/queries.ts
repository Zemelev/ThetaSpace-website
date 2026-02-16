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

// Додати до існуючого файлу queries.ts

export const GET_LECTURE_BY_ID = `
  query GetLectureById($id: ID!) {
    lecture(id: $id, idType: DATABASE_ID) {
      id
      title
      content
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
        status
        maxAttendees
        registered
        lecturerName {
          nodes {
            ... on Mentor {
              id
              title
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

export const GET_COURSE_BY_ID = `
  query GetCourseById($id: ID!) {
    course(id: $id, idType: DATABASE_ID) {
      id
      title
      content
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
        startDate
        level
      }
    }
  }
`;

export const GET_MENTOR_BY_ID = `
  query GetMentorById($id: ID!) {
    mentor(id: $id, idType: DATABASE_ID) {
      id
      title
      content
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
        experience
        specialization
        socialLinks
      }
    }
  }
`;


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
        startDate
        level
      }
    }
  }
`;

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
        experience
        specialization
        socialLinks
      }
    }
  }
`;