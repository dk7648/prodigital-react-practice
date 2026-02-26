export type BlogItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorNickname: string;
  likeCount: number;
  commentCount: number;
};

export type ApiResponse = {
  data: {
    items: BlogItem[];
  };
};
