
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  const fetchMessages = async () => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${session.user.id},receiver_id.eq.${session.user.id}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages(data || []);
    setLoading(false);
  };

  const sendMessage = async (receiverId: string, content: string) => {
    if (!session?.user) return;

    // Create message object to add to local state
    const newMessage = {
      id: crypto.randomUUID(), // Temporary ID until DB assigns one
      sender_id: session.user.id,
      receiver_id: receiverId,
      content,
      created_at: new Date().toISOString(),
      read: false
    };

    // Optimistically update UI by adding to local state first
    setMessages(prev => [...prev, newMessage]);

    // Then send to server
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: session.user.id,
        receiver_id: receiverId,
        content,
        read: false
      });

    if (error) {
      console.error('Error sending message:', error);
      // Could add error handling here to revert the optimistic update
    }

    return { data, error };
  };

  useEffect(() => {
    fetchMessages();
    
    // Real-time subscription
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `receiver_id=eq.${session?.user?.id}`
        },
        (payload) => {
          // We'll still update from the real-time feed, but avoid duplicates
          const newMsg = payload.new as Message;
          setMessages(prev => {
            // Check if we already have this message (prevents duplicates with optimistic updates)
            const msgExists = prev.some(msg => 
              msg.id === newMsg.id || 
              (msg.sender_id === newMsg.sender_id && 
               msg.content === newMsg.content && 
               msg.created_at === newMsg.created_at)
            );
            
            if (msgExists) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return { messages, loading, sendMessage };
};
