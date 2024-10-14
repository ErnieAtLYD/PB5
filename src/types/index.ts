export interface Paste {
  id: string;
  content: string;
  createdAt: Date;
}

export interface PasteFormProps {
  onSubmit: (content: string) => void;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export type Nullable<T> = T | null;
