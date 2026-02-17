// ==================== ЛЕКЦІЇ ====================

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
          lectureImage {
            node {                  
              sourceUrl
              altText
              title
            }
          }
          lecturerName {
            nodes {
              ... on Mentor {
                id
                title
                slug
                mentorDetails {
                  position
                  mentorPhoto {
                    node {             
                      sourceUrl
                      altText
                    }
                  }
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
    lectures(first: 20) {
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
          lectureImage {
             node {                  
              sourceUrl
              altText
            }
          }
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
        lectureImage {
          node {                    
            sourceUrl
            altText
            title
          }
        }
        lecturerName {
          nodes {
            ... on Mentor {
              id
              title
              slug
              mentorDetails {
                position
                shortBio
                mentorPhoto {
                  node {             
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ==================== КУРСИ ====================

export const GET_ALL_COURSES = `
  query GetAllCourses {
    courses(first: 20) {
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
          courseImage {
            node {                    
              sourceUrl
              altText
              title
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
        courseImage {
           node {                    
            sourceUrl
            altText
            title
          }
        }
      }
    }
  }
`;

// ==================== МЕНТОРИ ====================

export const GET_ALL_MENTORS = `
  query GetAllMentors {
    mentors(first: 20) {
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
          mentorPhoto {
            node {                 
              sourceUrl
              altText
              title
            }
          }
        }
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
        socialLinks
        mentorPhoto {
          node {                   
            sourceUrl
            altText
            title
          }
        }
      }
    }
  }
`;