import type {User} from './user'
import type {Contest} from './contest'
import type {Submission} from './submission'

export interface AuthResponse{
    token:string
    user:User
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: FieldError[];
  };
}

export interface Paged<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface HomeData {
  activeContest: Contest| null;
  lastResults: Contest| null;
}

export interface GalleryResponse {
  contest: Contest;
  items: Submission[];
}