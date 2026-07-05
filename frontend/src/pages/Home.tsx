import AmbientBackground from "../components/AmbientBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

interface HomeProps {
  username: string;
  setUsername: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
  children?: React.ReactNode;
}

export default function Home({
  username,
  setUsername,
  onSearch,
  loading,
  children,
}: HomeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      <AmbientBackground />

      <Navbar />

      <main className="relative z-10">

        <Hero
          username={username}
          setUsername={setUsername}
          onSearch={onSearch}
          loading={loading}
        />

        {children}

      </main>

    </div>
  );
}