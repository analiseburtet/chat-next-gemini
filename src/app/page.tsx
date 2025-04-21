"use client";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="flex justify-center flex-col p-2 md:p-20 max-h-screen">
      <Chat />
    </div>
  );
}
