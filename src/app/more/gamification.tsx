import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { FilterChip } from '@/components/filter-chip';
import { ListItem } from '@/components/list-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useCivicPoints } from '@/hooks/use-civic-points';
import { mockBusinesses } from '@/mocks/businesses';
import { mockRedeemedCoupons } from '@/mocks/redeemed-coupons';
import { mockRewards } from '@/mocks/rewards';
import type { CivicPointsEntry, RedeemedCoupon, Reward } from '@/types';
import { formatDate } from '@/utils/format-date';

const REWARD_TYPE_LABEL: Record<Reward['type'], string> = {
  discount: 'Descuento',
  free_product: 'Producto gratis',
};

function businessName(businessId: string): string {
  return mockBusinesses.find((business) => business.id === businessId)?.name ?? 'Comercio';
}

function generateCouponCode(): string {
  return `CUP-${Math.random().toString(16).slice(2, 7).toUpperCase()}`;
}

type GamificationView = 'points' | 'rewards' | 'coupons';

function PointsView({
  totalPoints,
  history,
}: {
  totalPoints: number;
  history: CivicPointsEntry[];
}) {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <FlatList
      data={sortedHistory}
      keyExtractor={(entry, index) => `${entry.date}-${index}`}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.headerSection}>
          <Card style={styles.balanceCard}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              TU SALDO
            </ThemedText>
            <ThemedText type="subtitle">{totalPoints} puntos</ThemedText>
          </Card>
          <ThemedText type="smallBold">Historial</ThemedText>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          emoji="🏅"
          title="Aún no tienes movimientos"
          description="Reporta una incidencia o apúntate a un plan de Comunidad para ganar tus primeros puntos."
        />
      }
      renderItem={({ item }) => (
        <ListItem
          title={item.reason}
          subtitle={formatDate(item.date)}
          trailing={
            <Badge
              label={`${item.points > 0 ? '+' : ''}${item.points}`}
              variant={item.points > 0 ? 'success' : 'neutral'}
            />
          }
        />
      )}
    />
  );
}

function RewardRow({
  reward,
  affordable,
  onRedeem,
}: {
  reward: Reward;
  affordable: boolean;
  onRedeem: (reward: Reward) => void;
}) {
  return (
    <Card style={styles.rewardCard}>
      <View style={styles.rewardHeader}>
        <View style={styles.rewardTexts}>
          <ThemedText type="default">{reward.title}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {businessName(reward.businessId)}
          </ThemedText>
        </View>
        <Badge label={REWARD_TYPE_LABEL[reward.type]} />
      </View>
      <View style={styles.rewardFooter}>
        <ThemedText type="smallBold">{reward.costPoints} puntos</ThemedText>
        <Button
          title={affordable ? 'Canjear' : 'Puntos insuficientes'}
          variant={affordable ? 'primary' : 'secondary'}
          disabled={!affordable}
          onPress={() => onRedeem(reward)}
        />
      </View>
    </Card>
  );
}

function CouponResult({
  coupon,
  reward,
  onDone,
}: {
  coupon: RedeemedCoupon;
  reward: Reward;
  onDone: () => void;
}) {
  return (
    <Card style={styles.couponCard}>
      <ThemedText type="smallBold">🎟️ Cupón canjeado</ThemedText>
      <ThemedText type="default">{reward.title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {businessName(reward.businessId)}
      </ThemedText>
      <ThemedText type="codeLarge" style={styles.couponCode}>
        {coupon.code}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Muestra este código en el comercio para canjearlo.
      </ThemedText>
      <Button
        title="Volver a recompensas"
        variant="secondary"
        onPress={onDone}
        style={styles.formButton}
      />
    </Card>
  );
}

function RewardsView({
  totalPoints,
  onRedeemed,
}: {
  totalPoints: number;
  onRedeemed: (reward: Reward, coupon: RedeemedCoupon) => void;
}) {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemedCoupon, setRedeemedCoupon] = useState<RedeemedCoupon | null>(null);
  // Guards against a double-tap on "Confirmar canje" firing the redemption
  // twice before React re-renders past it (see rn-reviewer finding on HAS-18).
  const [isRedeeming, setIsRedeeming] = useState(false);

  if (redeemedCoupon && selectedReward) {
    return (
      <View style={styles.content}>
        <CouponResult
          coupon={redeemedCoupon}
          reward={selectedReward}
          onDone={() => {
            setSelectedReward(null);
            setRedeemedCoupon(null);
            setIsRedeeming(false);
          }}
        />
      </View>
    );
  }

  if (selectedReward) {
    const remaining = totalPoints - selectedReward.costPoints;
    return (
      <View style={styles.content}>
        <Card style={styles.confirmCard}>
          <ThemedText type="smallBold">Confirmar canje</ThemedText>
          <ThemedText type="default">{selectedReward.title}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {businessName(selectedReward.businessId)}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Coste: {selectedReward.costPoints} puntos · Saldo restante: {remaining} puntos
          </ThemedText>
          <View style={styles.formActions}>
            <Button title="Cancelar" variant="ghost" onPress={() => setSelectedReward(null)} />
            <Button
              title="Confirmar canje"
              disabled={isRedeeming}
              onPress={() => {
                if (isRedeeming) {
                  return;
                }
                setIsRedeeming(true);
                const coupon: RedeemedCoupon = {
                  id: `cpn-${Date.now()}`,
                  rewardId: selectedReward.id,
                  code: generateCouponCode(),
                  redeemedDate: new Date().toISOString(),
                };
                setRedeemedCoupon(coupon);
                onRedeemed(selectedReward, coupon);
              }}
            />
          </View>
        </Card>
      </View>
    );
  }

  return (
    <FlatList
      data={mockRewards}
      keyExtractor={(reward) => reward.id}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <RewardRow
          reward={item}
          affordable={totalPoints >= item.costPoints}
          onRedeem={setSelectedReward}
        />
      )}
    />
  );
}

function CouponsView({ coupons }: { coupons: RedeemedCoupon[] }) {
  return (
    <FlatList
      data={coupons}
      keyExtractor={(coupon) => coupon.id}
      contentContainerStyle={styles.content}
      ListEmptyComponent={
        <EmptyState
          emoji="🎟️"
          title="Aún no has canjeado ningún cupón"
          description="Canjea una recompensa desde la pestaña 'Recompensas'."
        />
      }
      renderItem={({ item }) => {
        const reward = mockRewards.find((r) => r.id === item.rewardId);
        return (
          <Card style={styles.couponRow}>
            <View style={styles.rewardHeader}>
              <View style={styles.rewardTexts}>
                <ThemedText type="default">{reward?.title ?? 'Recompensa'}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {reward ? businessName(reward.businessId) : ''}
                </ThemedText>
              </View>
              <Badge label={formatDate(item.redeemedDate)} />
            </View>
            <ThemedText type="code">{item.code}</ThemedText>
          </Card>
        );
      }}
    />
  );
}

export default function GamificationScreen() {
  const { totalPoints, history, addPoints } = useCivicPoints();
  const [view, setView] = useState<GamificationView>('points');
  const [coupons, setCoupons] = useState<RedeemedCoupon[]>(mockRedeemedCoupons);

  function handleRedeemed(reward: Reward, coupon: RedeemedCoupon) {
    addPoints(`Canjeaste: ${reward.title}`, -reward.costPoints);
    setCoupons((current) => [coupon, ...current]);
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.viewSwitch}>
          <FilterChip
            label="Mis puntos"
            selected={view === 'points'}
            onPress={() => setView('points')}
            accessibilityLabel="Ver mis puntos"
          />
          <FilterChip
            label="Recompensas"
            selected={view === 'rewards'}
            onPress={() => setView('rewards')}
            accessibilityLabel="Ver catálogo de recompensas"
          />
          <FilterChip
            label="Mis cupones"
            selected={view === 'coupons'}
            onPress={() => setView('coupons')}
            accessibilityLabel="Ver mis cupones canjeados"
          />
        </View>

        {view === 'points' ? (
          <PointsView totalPoints={totalPoints} history={history} />
        ) : view === 'rewards' ? (
          <RewardsView totalPoints={totalPoints} onRedeemed={handleRedeemed} />
        ) : (
          <CouponsView coupons={coupons} />
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
  viewSwitch: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    marginBottom: Spacing.one,
  },
  content: {
    gap: Spacing.two,
    padding: Spacing.four,
  },
  headerSection: {
    gap: Spacing.two,
    marginBottom: Spacing.one,
  },
  balanceCard: {
    gap: Spacing.one,
    alignItems: 'flex-start',
    marginBottom: Spacing.two,
  },
  rewardCard: {
    gap: Spacing.two,
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  rewardTexts: {
    flex: 1,
    gap: Spacing.half,
  },
  rewardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  confirmCard: {
    gap: Spacing.one,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  formButton: {
    alignSelf: 'flex-start',
  },
  couponCard: {
    gap: Spacing.one,
    alignItems: 'flex-start',
  },
  couponCode: {
    marginVertical: Spacing.one,
  },
  couponRow: {
    gap: Spacing.two,
  },
});
