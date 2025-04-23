
import React, { useState, useEffect } from 'react';
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useMessages } from '@/hooks/useMessages';
import { supabase } from '@/integrations/supabase/client';
import ConversationList from '@/components/messages/ConversationList';
import ChatMessages from '@/components/messages/ChatMessages';

const DealerMessages = () => {
  const { messages, sendMessage } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);
  const [farmers, setFarmers] = useState<any[]>([]);
  
  // Filter messages for the selected conversation
  const conversationMessages = messages.filter(
    msg => (msg.sender_id === selectedFarmer || msg.receiver_id === selectedFarmer)
  );

  const selectedFarmerDetails = farmers.find(farmer => farmer.id === selectedFarmer);

  useEffect(() => {
    const fetchFarmers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'farmer');

      if (data) {
        // Add last message to each farmer's data
        const farmersWithLastMessage = data.map(farmer => {
          const farmerMessages = messages.filter(
            msg => msg.sender_id === farmer.id || msg.receiver_id === farmer.id
          );
          const lastMessage = farmerMessages[farmerMessages.length - 1]?.content;
          return { ...farmer, last_message: lastMessage };
        });
        setFarmers(farmersWithLastMessage);
      }
    };

    fetchFarmers();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (selectedFarmer && newMessage.trim()) {
      await sendMessage(selectedFarmer, newMessage);
      setNewMessage('');
    }
  };

  return (
    <DealerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <Card className="col-span-4 p-4 overflow-y-auto">
            <ConversationList 
              conversations={farmers}
              selectedId={selectedFarmer || undefined}
              onSelect={(id) => setSelectedFarmer(id)}
            />
          </Card>

          {/* Chat Area */}
          <Card className="col-span-8 flex flex-col">
            {selectedFarmer ? (
              <>
                <div className="border-b p-4">
                  <h2 className="font-semibold">
                    {selectedFarmerDetails?.full_name || 'Unnamed Farmer'}
                  </h2>
                </div>

                <ChatMessages 
                  messages={conversationMessages}
                  participantName={selectedFarmerDetails?.full_name || 'Unnamed Farmer'}
                />

                <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </Card>
        </div>
      </div>
    </DealerLayout>
  );
};

export default DealerMessages;
