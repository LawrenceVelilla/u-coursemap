import Search  from "@/components/Search";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-12">
        <main className="text-center">
          <h1 className="text-4xl font-bold">Welcome to UCourseMap</h1>
        </main>
        
        <section className="w-full max-w-2xl">
          <Search />
        </section>
      </div>
    </div>
  );
}
