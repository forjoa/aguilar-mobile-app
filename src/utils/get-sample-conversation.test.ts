import { getSampleConversation } from '@/utils/get-sample-conversation';
import type { Business, Product } from '@/types';

const business: Business = {
  id: 'biz-test',
  name: 'Comercio de prueba',
  category: 'Servicios',
  description: 'Un comercio de prueba.',
  address: 'Calle Falsa, 1',
};

function makeProduct(overrides: Partial<Product>): Product {
  return {
    id: 'prod-test',
    businessId: business.id,
    name: 'Producto de prueba',
    price: 9.99,
    description: 'Una descripción de prueba.',
    available: true,
    ...overrides,
  };
}

describe('getSampleConversation', () => {
  it('mentions the price and confirms availability when the product is available', () => {
    const conversation = getSampleConversation(
      makeProduct({ available: true, price: 5 }),
      business,
    );

    const businessReplies = conversation.messages.filter(
      (message) => message.sender === 'business',
    );
    expect(businessReplies.some((message) => message.text.includes('5'))).toBe(true);
    expect(conversation.messages).toHaveLength(4);
  });

  it('asks about restocking instead when the product is unavailable', () => {
    const conversation = getSampleConversation(makeProduct({ available: false }), business);

    expect(conversation.messages.some((message) => message.text.includes('agotado'))).toBe(true);
  });

  it('ids the conversation and links it to the product and business', () => {
    const product = makeProduct({ id: 'prod-42' });
    const conversation = getSampleConversation(product, business);

    expect(conversation.id).toBe('conv-prod-42');
    expect(conversation.productId).toBe('prod-42');
    expect(conversation.businessId).toBe(business.id);
  });
});
