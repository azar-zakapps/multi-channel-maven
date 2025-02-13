
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <main className="container mx-auto p-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
};
