import { act, renderHook } from '@testing-library/react-native';

import { useTimedMessage } from '@/hooks/use-timed-message';

describe('useTimedMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts with no message', async () => {
    const { result } = await renderHook(() => useTimedMessage(1000));

    expect(result.current[0]).toBeNull();
  });

  it('shows the message, then clears it after the duration', async () => {
    const { result } = await renderHook(() => useTimedMessage(1000));

    await act(async () => {
      result.current[1]('+10 puntos');
    });
    expect(result.current[0]).toBe('+10 puntos');

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBeNull();
  });

  it('restarts the timer when shown again before it clears', async () => {
    const { result } = await renderHook(() => useTimedMessage(1000));

    await act(async () => {
      result.current[1]('+10 puntos');
    });
    await act(async () => {
      jest.advanceTimersByTime(700);
    });
    await act(async () => {
      result.current[1]('+5 puntos');
    });
    // Only 300ms left on the original timer — the restart should have reset it.
    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current[0]).toBe('+5 puntos');

    await act(async () => {
      jest.advanceTimersByTime(700);
    });
    expect(result.current[0]).toBeNull();
  });
});
