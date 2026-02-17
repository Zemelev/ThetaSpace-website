// types/index.ts

export interface Image {
  id?: number;
  url: string;
  alt?: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface MediaItemNode {
  sourceUrl: string;
  altText?: string;
  title?: string;
  mediaDetails?: {
    width?: number;
    height?: number;
  };
}

export interface MediaItemConnectionEdge {
  node: MediaItemNode;  
}

export interface Lecturer {
  id: string;
  title: string;
  slug?: string;
  mentorDetails?: {
    position?: string;
    shortBio?: string;
    mentor_photo?: Image;
  };
}

export interface Lecture {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  uri?: string;
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
    lectureImage?: MediaItemConnectionEdge;
    lecturerName?: {
      nodes?: Lecturer[];
    };
  };
}

export interface Course {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  uri?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  courseDetails?: {
    duration?: string;
    coursePrice?: string;
    format?: any;
    includes?: string;
    courseImage?: MediaItemConnectionEdge;
  };
}

export interface Mentor {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  uri?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  mentorDetails?: {
    position?: string;
    shortBio?: string;
    socialLinks?: string;
    mentorPhoto?: MediaItemConnectionEdge;
  };
}

// Відповіді GraphQL
export interface LecturesResponse {
  lectures: {
    nodes: Lecture[];
  };
}

export interface CoursesResponse {
  courses: {
    nodes: Course[];
  };
}

export interface MentorsResponse {
  mentors: {
    nodes: Mentor[];
  };
}

export interface LectureResponse {
  lecture: Lecture | null;
}

export interface CourseResponse {
  course: Course | null;
}

export interface MentorResponse {
  mentor: Mentor | null;
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string; locations?: any; path?: any }>;
}