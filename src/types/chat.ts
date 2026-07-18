export type MessageSender = 'persona' | 'user';

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  translation?: string;
}

export type RecordingState = 'idle' | 'listening' | 'processing' | 'done';
