import { DocumentData, DocumentReference } from "firebase/firestore";

export type QuickNoteType = {
    title: string,
    body: string
};

export type NoteType = {
    id: string,
    title: string,
    body: string,
    ref?: DocumentReference<DocumentData>,
    noteType: NoteTypeType
};

export type Note = {
    note: NoteType
};

export type NoteTypeType = "QUICK" | "MARKDOWN";