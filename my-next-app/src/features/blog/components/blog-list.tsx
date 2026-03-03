import Link from 'next/link';
import { BlogItem } from '../types/blog-type';
import BlogListClient from './blog-list.client';

const url = 'https://shinhan-pda-react-router-full-examp.vercel.app/api/posts';
export default async function BlogList() {
  const response = await fetch(url);
  const data = await response.json();
  const items = data.data.items;
  return (
    <>
      <BlogListClient initialData={items} />
    </>
  );
}
