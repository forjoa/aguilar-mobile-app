// Mock data — Conversation. Not sourced from any real API (see README, no-backend phase).
// Pre-written example chats so "Mis conversaciones" isn't empty on first open —
// opening a chat on any other product generates a fresh one from a simple
// script (see `get-sample-conversation.ts`).
import type { Conversation } from '@/types';

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    businessId: 'biz-1',
    productId: 'prod-1',
    lastMessageDate: '2026-08-27T10:15:00',
    messages: [
      {
        id: 'conv-1-msg-1',
        sender: 'user',
        text: '¡Hola! ¿El pan de pueblo lo hacéis también integral?',
      },
      {
        id: 'conv-1-msg-2',
        sender: 'business',
        text: 'Hola, sí, tenemos barra integral todos los días a partir de las 8:00.',
      },
      {
        id: 'conv-1-msg-3',
        sender: 'user',
        text: 'Genial, ¿puedo reservar una para recoger por la tarde?',
      },
      {
        id: 'conv-1-msg-4',
        sender: 'business',
        text: 'Claro, resérvala respondiendo aquí y te la guardamos hasta las 20:00.',
      },
    ],
  },
  {
    id: 'conv-2',
    businessId: 'biz-4',
    productId: 'prod-4',
    lastMessageDate: '2026-08-25T18:40:00',
    messages: [
      {
        id: 'conv-2-msg-1',
        sender: 'user',
        text: 'Hola, veo que el vestido de verano está agotado. ¿Vais a reponer stock?',
      },
      {
        id: 'conv-2-msg-2',
        sender: 'business',
        text: 'Hola, sí, esperamos reposición la semana que viene. ¿Qué talla necesitas?',
      },
      { id: 'conv-2-msg-3', sender: 'user', text: 'Una talla M, en el color azul si es posible.' },
      {
        id: 'conv-2-msg-4',
        sender: 'business',
        text: 'Perfecto, te la reservamos en cuanto entre y te avisamos por aquí.',
      },
    ],
  },
  {
    id: 'conv-3',
    businessId: 'biz-6',
    productId: 'prod-17',
    lastMessageDate: '2026-08-24T12:05:00',
    messages: [
      {
        id: 'conv-3-msg-1',
        sender: 'user',
        text: 'Hola, ¿los auriculares bluetooth traen garantía?',
      },
      {
        id: 'conv-3-msg-2',
        sender: 'business',
        text: 'Hola, sí, dos años de garantía oficial y ticket de compra en tienda.',
      },
      { id: 'conv-3-msg-3', sender: 'user', text: 'Perfecto, me paso esta tarde a por ellos.' },
      { id: 'conv-3-msg-4', sender: 'business', text: 'Te esperamos, ¡hasta luego!' },
    ],
  },
];
