import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaytabsService } from '../paytabs/paytabs.service';
import { User, Enrollment, Transaction } from 'src/models';
import { CartService } from '../cart/cart.service';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private payTabsService: PaytabsService,
    private cartService: CartService,
    private dataSource: DataSource
  ) {}

  async findUserEnrollments(id: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      where: { studentId: id },
      relations: ['course'],
      withDeleted: true,
    });
  }
  async isUserEnrolled(
    studentId: number,
    courseId: number,
    /** include soft‑deleted rows too? */
    includeDeleted = false,
  ): Promise<boolean> {
    const count = await this.enrollmentRepository.count({
      where: { studentId, courseId },
      withDeleted: includeDeleted,
    });
  
    return count > 0;
  }
  async createEnrollment(body: any): Promise<any> {
    const tranRef = body.tran_ref;
    try {
      const transaction = await this.payTabsService.verifyTransaction(tranRef);
      console.log('Transaction:', transaction);
      if(transaction.payment_result.response_status !== 'A') {
        throw new Error('Payment not authorized');
      }
      const cartId = transaction.cart_id;
      console.log('Cart ID:', cartId);
      const [, userId] = transaction.cart_id.split(':');
      console.log('User ID:', userId);
  
      const cart = await this.cartService.getCart(parseInt(userId));
  
      if (!cart) {
        throw new Error('Cart not found');
      }

      const transactionRecords = cart.map(course => ({
        courseId: course.courseId,
        userId: parseInt(userId),
        paymentMethod: body.payment_info.payment_method,
        amount: course.price,
        transactionId: tranRef,
      }))

      const {enrollments, transactions} = await this.dataSource.transaction(async transactionalEntityManager => {
        const user = await transactionalEntityManager.findOne(User, {
          where: { id: parseInt(userId) },
          select: ['id', 'email', 'username'],
        });
  
        if (!user) {
          throw new Error('User not found');
        }

        const savedTransactions = await transactionalEntityManager.save(Transaction, transactionRecords);

        const enrollments = cart.map(course => ({
          studentId: user.id,
          courseId: course.courseId
        }));
  
        await this.payTabsService.captureTransaction(tranRef, body.cart_id, body.cart_description, body.cart_amount);
        const savedEnrollments = await transactionalEntityManager.save(Enrollment, enrollments);
        return { transactions: savedTransactions, enrollments: savedEnrollments };
      });

      await this.cartService.clearCart(parseInt(userId));
      return { enrollments, transactions };
    } catch (error) {
      console.error('Error creating enrollment:', error);
      await this.payTabsService.voidTransaction(tranRef, body.cart_id, body.cart_description, body.cart_amount);
      throw new Error('Enrollment creation failed');
    }
  }
}
