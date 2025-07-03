import { Test, TestingModule } from '@nestjs/testing';
import { PayountTransactionService } from './payount_transaction.service';

describe('PayountTransactionService', () => {
  let service: PayountTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayountTransactionService],
    }).compile();

    service = module.get<PayountTransactionService>(PayountTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
