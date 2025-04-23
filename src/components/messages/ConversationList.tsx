
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from 'lucide-react';

interface Conversation {
  id: string;
  full_name: string;
  avatar_url?: string;
  last_message?: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const ConversationList = ({ conversations, selectedId, onSelect }: ConversationListProps) => {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <Card
          key={conversation.id}
          className={`p-4 cursor-pointer hover:bg-gray-50 ${
            selectedId === conversation.id ? 'bg-primary/5 border-primary' : ''
          }`}
          onClick={() => onSelect(conversation.id)}
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              {conversation.avatar_url ? (
                <img src={conversation.avatar_url} alt={conversation.full_name} />
              ) : (
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {conversation.full_name || 'Unnamed User'}
              </p>
              {conversation.last_message && (
                <p className="text-sm text-gray-500 truncate">{conversation.last_message}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ConversationList;
