import BlogMergedList from '@/features/blog/components/blog-merged';

const url = 'https://shinhan-pda-react-router-full-examp.vercel.app/api/posts';
export default async function TestPage() {
  const response = await fetch(url);
  const data = await response.json();
  const items = data.data.items;
  return (
    <>
      <BlogMergedList initialData={items} />
    </>
  );
}
