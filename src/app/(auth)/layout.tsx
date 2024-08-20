function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#04070F]">
      {children}
    </div>
  );
}

export default layout;
