export interface Post {
  _id: string;
  prompt: string;
  tag: string;
  creator: {
    _id: string;
    userName: string;
    image: string;
    email: string;
  };
}
