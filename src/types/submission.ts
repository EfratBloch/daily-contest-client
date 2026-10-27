import type { Contest } from './contest';
export type FileKind = 'IMAGE' | 'DOCUMENT';
export interface Author {
    id: number
    name: string
}
export interface Submission {
    "id": number,
    "contestId": number,
    "title": string,
    "description": string | null,
    "fileKind": FileKind,
    "fileUrl": string,
    "thumbnailUrl": string | null,
    "textContent": string | null,
    "originalFileName": string,
    "mimeType": string,
    "fileSize": string,
    "place": 1 | 2 | 3 | null,
    "author": Author,
    "isMine": boolean,
    "votedByMe": boolean,
    "points": number | null
    "isHidden": boolean,
    "createdAt": string,
    "updatedAt": string
}
export interface MySubmission extends Submission{
    contest:Contest
}