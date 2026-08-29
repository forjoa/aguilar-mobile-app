import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { FilterChip } from '@/components/filter-chip';
import { ListItem } from '@/components/list-item';
import { LoadingSpinner } from '@/components/loading-spinner';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useSimulatedLoading } from '@/hooks/use-simulated-loading';
import { useTheme } from '@/hooks/use-theme';
import { mockBusinesses } from '@/mocks/businesses';
import { mockConversations } from '@/mocks/conversations';
import { mockProducts } from '@/mocks/products';
import type { Business, ChatMessage, Conversation, Product } from '@/types';
import { formatDateTime } from '@/utils/format-date';
import { getSampleConversation } from '@/utils/get-sample-conversation';

const ALL_CATEGORIES = 'all';

const CATEGORY_EMOJI: Record<string, string> = {
  Alimentación: '🥖',
  Hogar: '🔧',
  Hostelería: '🍽️',
  Ropa: '👗',
  Servicios: '💇',
  Tecnología: '🔌',
};

function categoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? '🏬';
}

function PhotoPlaceholder({ emoji }: { emoji: string }) {
  const theme = useTheme();
  return (
    // Stand-in for a real logo/product photo while there's no backend or
    // real media (see README) — hidden from screen readers since the row
    // it sits in already carries the accessible title/subtitle.
    <View
      style={[styles.photo, { backgroundColor: theme.backgroundElement }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <ThemedText style={styles.photoEmoji}>{emoji}</ThemedText>
    </View>
  );
}

type BusinessTabView = 'businesses' | 'my-conversations' | 'chat';

function ProductFicha({
  product,
  onAskQuestion,
}: {
  product: Product;
  onAskQuestion: (product: Product) => void;
}) {
  return (
    <View style={styles.productFicha}>
      <View style={styles.productFichaRow}>
        <PhotoPlaceholder emoji="🏷️" />
        <View style={styles.productFichaTexts}>
          <ThemedText type="default">{product.name}</ThemedText>
          <ThemedText type="smallBold">{product.price.toFixed(2)} €</ThemedText>
        </View>
        <Badge
          label={product.available ? 'Disponible' : 'Agotado'}
          variant={product.available ? 'success' : 'neutral'}
        />
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {product.description}
      </ThemedText>
      <Button
        title="💬 Preguntar"
        variant="secondary"
        onPress={() => onAskQuestion(product)}
        style={styles.askButton}
      />
    </View>
  );
}

function BusinessCard({
  business,
  products,
  expandedBusiness,
  expandedProductId,
  onToggleBusiness,
  onToggleProduct,
  onAskQuestion,
}: {
  business: Business;
  products: Product[];
  expandedBusiness: boolean;
  expandedProductId: string | null;
  onToggleBusiness: () => void;
  onToggleProduct: (productId: string) => void;
  onAskQuestion: (product: Product) => void;
}) {
  return (
    <Card style={styles.card}>
      <Pressable
        onPress={onToggleBusiness}
        accessibilityRole="button"
        accessibilityLabel={`Ver productos de ${business.name}`}
        accessibilityState={{ expanded: expandedBusiness }}
        style={({ pressed }) => [styles.businessRow, pressed && styles.pressed]}
      >
        <PhotoPlaceholder emoji={categoryEmoji(business.category)} />
        <View style={styles.businessTexts}>
          <ThemedText type="default">{business.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {business.address}
          </ThemedText>
        </View>
        <Badge label={business.category} />
      </Pressable>

      {expandedBusiness ? (
        <View style={styles.productsList}>
          <ThemedText type="smallBold">Productos y ofertas</ThemedText>
          {products.map((product) => (
            <View key={product.id}>
              <ListItem
                title={product.name}
                subtitle={`${product.price.toFixed(2)} €`}
                onPress={() => onToggleProduct(product.id)}
                accessibilityLabel={`Ver ficha de ${product.name}`}
              />
              {expandedProductId === product.id ? (
                <ProductFicha product={product} onAskQuestion={onAskQuestion} />
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

function ChatBubble({ message, business }: { message: ChatMessage; business: Business }) {
  const theme = useTheme();
  const isUser = message.sender === 'user';

  return (
    <View style={[styles.bubbleRow, isUser && styles.bubbleRowUser]}>
      <View
        style={[
          styles.bubble,
          { backgroundColor: isUser ? theme.primary : theme.backgroundElement },
        ]}
      >
        <ThemedText type="small" themeColor="textSecondary" style={styles.bubbleSender}>
          {isUser ? 'Tú' : business.name}
        </ThemedText>
        <ThemedText type="default" style={isUser && { color: theme.background }}>
          {message.text}
        </ThemedText>
      </View>
    </View>
  );
}

function ChatView({
  conversation,
  business,
  product,
  onBack,
  onSend,
}: {
  conversation: Conversation;
  business: Business;
  product: Product | undefined;
  onBack: () => void;
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = useState('');

  return (
    <View style={styles.chatContainer}>
      <Button title="← Volver" variant="ghost" onPress={onBack} style={styles.backButton} />
      <ThemedText type="smallBold">{business.name}</ThemedText>
      {product ? (
        <ThemedText type="small" themeColor="textSecondary">
          Sobre: {product.name}
        </ThemedText>
      ) : null}
      <FlatList
        data={conversation.messages}
        keyExtractor={(message) => message.id}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => <ChatBubble message={item} business={business} />}
      />
      <View style={styles.composeSection}>
        <TextField
          label="Mensaje"
          value={draft}
          onChangeText={setDraft}
          placeholder="Escribe un mensaje…"
        />
        <Button
          title="Enviar"
          onPress={() => {
            if (!draft.trim()) {
              return;
            }
            onSend(draft.trim());
            setDraft('');
          }}
          style={styles.sendButton}
        />
      </View>
    </View>
  );
}

export default function BusinessScreen() {
  const isLoading = useSimulatedLoading();
  const [view, setView] = useState<BusinessTabView>('businesses');
  const [categoryFilter, setCategoryFilter] = useState<string>(ALL_CATEGORIES);
  const [expandedBusinessId, setExpandedBusinessId] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(mockBusinesses.map((business) => business.category))).sort(),
    [],
  );

  const filteredBusinesses = useMemo(
    () =>
      mockBusinesses.filter(
        (business) => categoryFilter === ALL_CATEGORIES || business.category === categoryFilter,
      ),
    [categoryFilter],
  );

  const sortedConversations = useMemo(
    () =>
      [...conversations].sort(
        (a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime(),
      ),
    [conversations],
  );

  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;
  const activeBusiness = activeConversation
    ? (mockBusinesses.find((b) => b.id === activeConversation.businessId) ?? null)
    : null;
  const activeProduct = activeConversation
    ? mockProducts.find((p) => p.id === activeConversation.productId)
    : undefined;

  function handleToggleBusiness(businessId: string) {
    setExpandedBusinessId((current) => (current === businessId ? null : businessId));
    setExpandedProductId(null);
  }

  function handleAskQuestion(product: Product) {
    const business = mockBusinesses.find((b) => b.id === product.businessId);
    if (!business) {
      return;
    }
    const existing = conversations.find((c) => c.productId === product.id);
    const conversation = existing ?? getSampleConversation(product, business);
    if (!existing) {
      setConversations((current) => [conversation, ...current]);
    }
    setActiveConversationId(conversation.id);
    setView('chat');
  }

  function handleOpenConversation(conversationId: string) {
    setActiveConversationId(conversationId);
    setView('chat');
  }

  function handleSendMessage(text: string) {
    if (!activeConversation) {
      return;
    }
    const userMessage: ChatMessage = {
      id: `${activeConversation.id}-user-${Date.now()}`,
      sender: 'user',
      text,
    };
    const businessReply: ChatMessage = {
      id: `${activeConversation.id}-reply-${Date.now()}`,
      sender: 'business',
      text: 'Gracias por tu mensaje, te contestamos en breve 👍',
    };
    setConversations((current) =>
      current.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              messages: [...c.messages, userMessage, businessReply],
              lastMessageDate: new Date().toISOString(),
            }
          : c,
      ),
    );
  }

  const businessesView = (
    <FlatList
      data={filteredBusinesses}
      keyExtractor={(business) => business.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.chipRow}>
          <FilterChip
            label="Todas"
            selected={categoryFilter === ALL_CATEGORIES}
            onPress={() => setCategoryFilter(ALL_CATEGORIES)}
          />
          {categories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              selected={categoryFilter === category}
              onPress={() => setCategoryFilter(category)}
            />
          ))}
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          emoji="🏬"
          title="Sin comercios para este filtro"
          description="Prueba a quitar el filtro de categoría."
        />
      }
      renderItem={({ item }) => (
        <BusinessCard
          business={item}
          products={mockProducts.filter((product) => product.businessId === item.id)}
          expandedBusiness={expandedBusinessId === item.id}
          expandedProductId={expandedProductId}
          onToggleBusiness={() => handleToggleBusiness(item.id)}
          onToggleProduct={(productId) =>
            setExpandedProductId((current) => (current === productId ? null : productId))
          }
          onAskQuestion={handleAskQuestion}
        />
      )}
    />
  );

  const myConversationsView = (
    <FlatList
      data={sortedConversations}
      keyExtractor={(conversation) => conversation.id}
      contentContainerStyle={styles.content}
      ListEmptyComponent={
        <EmptyState
          emoji="💬"
          title="Aún no tienes conversaciones"
          description="Pregunta por un producto desde la pestaña 'Comercios'."
        />
      }
      renderItem={({ item }) => {
        const business = mockBusinesses.find((b) => b.id === item.businessId);
        const product = mockProducts.find((p) => p.id === item.productId);
        const lastMessage = item.messages[item.messages.length - 1];
        return (
          <ListItem
            title={business?.name ?? 'Comercio'}
            subtitle={`${product?.name ?? ''} · ${lastMessage?.text ?? ''}`}
            onPress={() => handleOpenConversation(item.id)}
            trailing={
              <ThemedText type="small" themeColor="textSecondary">
                {formatDateTime(item.lastMessageDate).split(',')[0]}
              </ThemedText>
            }
          />
        );
      }}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingSpinner label="Cargando comercios…" />
          </View>
        ) : view === 'chat' && activeConversation && activeBusiness ? (
          <ChatView
            conversation={activeConversation}
            business={activeBusiness}
            product={activeProduct}
            onBack={() => setView('businesses')}
            onSend={handleSendMessage}
          />
        ) : (
          <View style={styles.tabContent}>
            <View style={styles.viewSwitch}>
              <FilterChip
                label="Comercios"
                selected={view === 'businesses'}
                onPress={() => setView('businesses')}
                accessibilityLabel="Ver listado de comercios"
              />
              <FilterChip
                label="Mis conversaciones"
                selected={view === 'my-conversations'}
                onPress={() => setView('my-conversations')}
                accessibilityLabel="Ver mis conversaciones"
              />
            </View>
            {view === 'businesses' ? businessesView : myConversationsView}
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    flex: 1,
    gap: Spacing.three,
    paddingTop: Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  viewSwitch: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  content: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginBottom: Spacing.one,
  },
  card: {
    gap: Spacing.two,
  },
  businessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  businessTexts: {
    flex: 1,
    gap: Spacing.half,
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoEmoji: {
    fontSize: 22,
  },
  productsList: {
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  productFicha: {
    gap: Spacing.one,
    padding: Spacing.three,
  },
  productFichaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  productFichaTexts: {
    flex: 1,
    gap: Spacing.half,
  },
  askButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
  chatContainer: {
    flex: 1,
    gap: Spacing.one,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  messagesList: {
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubbleRowUser: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: Radius.large,
    padding: Spacing.three,
    gap: Spacing.half,
  },
  bubbleSender: {
    opacity: 0.8,
  },
  composeSection: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  sendButton: {
    alignSelf: 'flex-end',
  },
});
