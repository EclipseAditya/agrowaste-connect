
import React, { useEffect, useRef } from 'react';
import { Message } from '@/hooks/useMessages';
import { useAuth } from '@/providers/AuthProvider';

interface ChatMessagesProps {
  messages: Message[];
  participantName: string;
}

const ChatMessages = ({ messages, participantName }: ChatMessagesProps) => {
  const { session } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Start a conversation with {participantName}
        </div>
      ) : (
        messages.map((msg) => {
          const isCurrentUser = msg.sender_id === session?.user?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isCurrentUser
                    ? 'bg-primary text-white'
                    : 'bg-gray-100'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
