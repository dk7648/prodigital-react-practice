import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold">안녕하세요</h1>

        <Image src="/panda.jpg" width={200} height={200} alt="panda" priority />
        <a href="/blog-ser">블로그 서버</a>
        <a href="/blog">블로그</a>
      </main>
    </div>
  );
}
