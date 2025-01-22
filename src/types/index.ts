export type Message = {
  type: 'text' | 'audio';
  content?: string;
  uri?: string;
  duration?: string;
  isUser: boolean;
};
