export const logger = {
  info: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
};