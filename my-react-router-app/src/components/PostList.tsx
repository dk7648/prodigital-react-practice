// https://jsonplaceholder.typicode.com/posts

import { useEffect, useState } from 'react';

type PostItem = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(resp => resp.json())
      .then(data => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map(post => {
          return (
            <li key={post.id}>
              {post.title} - {post.body}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
