import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContext } from '../contexts/tenant.context';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const storeId = Number(req.headers['x-tenant-id']);
    if (!storeId) throw new Error('Tenant ID missing');

    TenantContext.run({ storeId }, () => {
      next();
    });
  }
}
