// Типи для лекцій

export interface Lecture {
  id: string;
  title: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  lectureDetails?: {
    dateTime?: string;
    location?: string;
    price?: string;
    lecturerName?: {
      node: {
        id: string;
        title: string;
        mentorDetails?: {
          position?: string;
        };
      };
    };
  };
}

// export interface Lecture {
//   id: string;
//   title: string;
//   excerpt?: string;
//   slug?: string;
//   featuredImage?: {
//     node: {
//       sourceUrl: string;
//       altText?: string;
//     };
//   };
//   lectureDetails?: {
//     dateTime?: string;
//     location?: string;
//     price?: string;
//     status?: string;
//     maxAttendees?: number;
//     registered?: number;
//     lecturerName?: {
//       node: Mentor;
//     };
//   };
// }

// Типи для курсів
export interface Course {
  id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  courseDetails?: {
    duration?: string;
    coursePrice?: string;
    format?: string;
    includes?: string;
  };
}

// Типи для менторів
export interface Mentor {
  id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  mentorDetails?: {
    position?: string;
    shortBio?: string;
    experience?: string;
    specialization?: string;
    socialLinks?: string;
  };
}

// Типи для відповідей GraphQL
export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}