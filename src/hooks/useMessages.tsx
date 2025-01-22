import { useState, useCallback } from 'react';
import { Message } from '../types';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [textMessage, setTextMessage] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sendTextMessage = useCallback(() => {
    if (textMessage.trim()) {
      setMessages(prev => [
        ...prev,
        {
          type: 'text',
          content: textMessage,
          isUser: true,
        },
      ]);
      setTextMessage('');
    }
  }, [textMessage]);

  const sendAudioMessage = useCallback((recordedUri: string, recordTime: string) => {
    if (recordedUri) {
      setMessages(prev => [
        ...prev,
        {
          type: 'audio',
          uri: recordedUri,
          duration: recordTime,
          isUser: true,
        },
      ]);
    }
  }, []);

  const handleCategorySelect = useCallback((label: string) => {
    setSelectedCategory(label);
  }, []);

  return {
    messages,
    textMessage,
    selectedCategory,
    setTextMessage,
    sendTextMessage,
    sendAudioMessage,
    handleCategorySelect,
  };
};
