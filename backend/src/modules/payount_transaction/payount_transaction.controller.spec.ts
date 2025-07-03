import { Test, TestingModule } from '@nestjs/testing';
import { PayountTransactionController } from './payount_transaction.controller';
import { PayountTransactionService } from './payount_transaction.service';

describe('PayountTransactionController', () => {
  let controller: PayountTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayountTransactionController],
      providers: [PayountTransactionService],
    }).compile();

    controller = module.get<PayountTransactionController>(PayountTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
