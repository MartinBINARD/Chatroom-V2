export type TisOpen = boolean;

export interface Message {
  id: number;
  author: string;
  content: string;
}

export interface Settings {
  isOpen: TisOpen;
  email: string;
  password: string;
}
