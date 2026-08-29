import type { Business, ChatMessage, Conversation, Product } from '@/types';

/**
 * Builds a plausible example conversation for a product that has no
 * pre-written one in `mockConversations` — same simulated-chat idea (no real
 * messaging backend, see README), generated from the product's own data
 * instead of being hand-written for every single mock product.
 */
export function getSampleConversation(
  product: Product,
  business: Business,
  now: Date = new Date(),
): Conversation {
  const messages: ChatMessage[] = [
    {
      id: `${product.id}-sample-1`,
      sender: 'user',
      text: `Hola, ¿me puedes dar más información sobre "${product.name}"?`,
    },
    {
      id: `${product.id}-sample-2`,
      sender: 'business',
      text: `¡Hola! Claro: ${product.description}`,
    },
    {
      id: `${product.id}-sample-3`,
      sender: 'user',
      text: product.available
        ? '¿Está disponible ahora mismo?'
        : '¿Sabéis cuándo volveréis a tener stock?',
    },
    {
      id: `${product.id}-sample-4`,
      sender: 'business',
      text: product.available
        ? `Sí, tienes disponible ahora mismo por ${product.price} €.`
        : 'Ahora mismo está agotado, pero te avisamos en cuanto repongamos.',
    },
  ];

  return {
    id: `conv-${product.id}`,
    businessId: business.id,
    productId: product.id,
    lastMessageDate: now.toISOString(),
    messages,
  };
}
