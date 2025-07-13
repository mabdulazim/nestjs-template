import { AsyncLocalStorage } from 'async_hooks';

type TenantContextType = {
  storeId: number;
  tenantDbName?: string;
};

const tenantStorage = new AsyncLocalStorage<TenantContextType>();

export const TenantContext = {
  run: <T>(context: TenantContextType, callback: () => T) => {
    return tenantStorage.run(context, callback);
  },
  get: (): TenantContextType => {
    return tenantStorage.getStore()!;
  },
};
