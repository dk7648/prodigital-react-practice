'use client';

import { useEffect, useState } from 'react';

// src/features/posts/components/post-detail.client.tsx
interface PostDetailClientProps {
  postId: string;
}

export default function PostDetailClient({ postId }: PostDetailClientProps) {
  console.log('PostDetailClient 컴포넌트');

  const [post, setPost] = useState<{ id: number; title: string } | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(resp => resp.json())
      .then(data => setPost(data));
  }, [postId]);

  return (
    <div>
      <h1>PostDetailClient</h1>
      <p>{postId}</p>

      <div>
        {post && (
          <div>
            <h1>{post.id}</h1>
            <h1>{post.title}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
