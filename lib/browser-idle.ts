type BrowserWindowWithIdle = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

type IdleTaskOptions = {
  delayMs?: number;
  timeoutMs?: number;
};

export function scheduleBrowserIdleTask(
  callback: () => void,
  {
    delayMs = 0,
    timeoutMs = 1200,
  }: IdleTaskOptions = {},
) {
  let idleHandle: number | null = null;
  const timer = window.setTimeout(() => {
    const browserWindow = window as BrowserWindowWithIdle;

    if (browserWindow.requestIdleCallback) {
      idleHandle = browserWindow.requestIdleCallback(callback, {
        timeout: timeoutMs,
      });
      return;
    }

    callback();
  }, delayMs);

  return () => {
    window.clearTimeout(timer);

    if (idleHandle !== null) {
      const browserWindow = window as BrowserWindowWithIdle;
      browserWindow.cancelIdleCallback?.(idleHandle);
    }
  };
}
