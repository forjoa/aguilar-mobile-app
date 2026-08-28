import { act, renderHook } from '@testing-library/react-native';

import { useSimulatedLoading } from '@/hooks/use-simulated-loading';

describe('useSimulatedLoading', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts as loading and flips to false once the delay elapses', async () => {
    const { result } = await renderHook(() => useSimulatedLoading(1000));

    expect(result.current).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);
  });

  it('stays loading before the delay elapses', async () => {
    const { result } = await renderHook(() => useSimulatedLoading(1000));

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(true);
  });
});
