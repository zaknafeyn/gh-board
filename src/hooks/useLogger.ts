import { useMemo } from 'react';
import { LoggingService, loggingService } from '../services/loggingService';

export const useLogger = (): LoggingService => {

  return useMemo(() => loggingService, []);
};
