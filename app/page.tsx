import Search  from "@/components/Search";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">Welcome to UCourseMap</h1>
        <hr/>
        <p className="mt-3 text-sm text-gray-500">Get started by exploring courses or planning your schedule.</p>
        <Search />
        <hr className="my-6" />
      </main>
    </div>
  );
}
