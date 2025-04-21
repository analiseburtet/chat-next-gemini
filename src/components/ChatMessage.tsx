import ReactMarkdown from "react-markdown";

const ChatMessage = ({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`p-3 rounded-lg max-w-xs prose ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
