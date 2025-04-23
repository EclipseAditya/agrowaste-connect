
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useMessages } from '@/hooks/useMessages';
import { supabase } from '@/integrations/supabase/client';
import ConversationList from '@/components/messages/ConversationList';
import ChatMessages from '@/components/messages/ChatMessages';

const Messages = () => {
  const { messages, sendMessage } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);
  const [dealers, setDealers] = useState<any[]>([]);
  
  // Filter messages for the selected conversation
  const conversationMessages = messages.filter(
    msg => (msg.sender_id === selectedDealer || msg.receiver_id === selectedDealer)
  );

  const selectedDealerDetails = dealers.find(dealer => dealer.id === selectedDealer);

  useEffect(() => {
    const fetchDealers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'dealer');

      if (data) {
        // Add last message to each dealer's data
        const dealersWithLastMessage = data.map(dealer => {
          const dealerMessages = messages.filter(
            msg => msg.sender_id === dealer.id || msg.receiver_id === dealer.id
          );
          const lastMessage = dealerMessages[dealerMessages.length - 1]?.content;
          return { ...dealer, last_message: lastMessage };
        });
        setDealers(dealersWithLastMessage);
      }
    };

    fetchDealers();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (selectedDealer && newMessage.trim()) {
      await sendMessage(selectedDealer, newMessage);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <Card className="col-span-4 p-4 overflow-y-auto">
            <ConversationList 
              conversations={dealers}
              selectedId={selectedDealer || undefined}
              onSelect={(id) => setSelectedDealer(id)}
            />
          </Card>

          {/* Chat Area */}
          <Card className="col-span-8 flex flex-col">
            {selectedDealer ? (
              <>
                <div className="border-b p-4">
                  <h2 className="font-semibold">
                    {selectedDealerDetails?.full_name || 'Unnamed Dealer'}
                  </h2>
                </div>

                <ChatMessages 
                  messages={conversationMessages}
                  participantName={selectedDealerDetails?.full_name || 'Unnamed Dealer'}
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
    </DashboardLayout>
  );
};

export default Messages;
