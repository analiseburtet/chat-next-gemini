import { useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

type Msg = {
  message: string;
  isUser: boolean;
};

const Chat = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Msg[]>([]);

  const handleSendMessage = (message: string | undefined) => {
    if (!message) return;

    setMessages((prev) => [...prev, { message, isUser: true }]);
    inputRef.current!.value = "";

    fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json() as Promise<string>)
      .then((message) => {
        setMessages((prev) => [...prev, { message, isUser: false }]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Card className="mb-4 max-h-[90vh] flex flex-col">
      <CardContent className="flex flex-col max-h-[85vh]">
        <CardTitle className="pb-2"> Converse com gemini</CardTitle>
        <div className="flex flex-col overflow-y-scroll mb-4">
          {messages.map(({ message, isUser }, index) => (
            <ChatMessage message={message} isUser={isUser} key={index} />
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputRef.current?.value);
          }}
        >
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            className="mb-4"
            ref={inputRef}
          />
          <Button className="bg-blue-500 text-white">Enviar</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Chat;
