import { TenantContext } from '../contexts/tenant.context';

export abstract class TenantBaseService {
  protected get storeId(): number {
    return TenantContext.get().storeId;
  }
}

// import { Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm';

// // tenant-database.service.ts
// @Injectable()
// export class TenantConnectionService {
//   private connections = new Map<string, DataSource>();

//   async getTenantConnection(tenantDb: string): Promise<DataSource> {
//     if (!this.connections.has(tenantDb)) {
//       const ds = new DataSource({
//         type: 'postgres',
//         database: tenantDb,
//         // rest of config...
//         entities: [Branch, City],
//       });
//       await ds.initialize();
//       this.connections.set(tenantDb, ds);
//     }

//     return this.connections.get(tenantDb)!;
//   }
// }
