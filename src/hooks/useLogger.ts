import { LoggingService, loggingService } from '../services/loggingService';

export const useLogger = (): LoggingService => {

  return loggingService;
};
