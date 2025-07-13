import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, User } from 'src/models';
import { In, Repository } from 'typeorm';
import axios from 'axios';
import { CartService } from '../cart/cart.service';

@Injectable()
export class PaytabsService {
  private readonly serverKey = process.env.PAYTABS_SECRET_KEY;
  private readonly profileId = process.env.PAYTABS_PROFILE_ID;
  private readonly baseUrl = 'https://secure-egypt.paytabs.com';

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly cartService: CartService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPaymentPage(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'username'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    const cartDetails = await this.cartService.getCart(userId);
    if (!cartDetails || cartDetails.length === 0) {
      throw new Error('Cart is empty');
    }
    const ids = cartDetails.map(course => course.courseId);
    const courses = await this.courseRepository.find({
      where: { id: In(ids) },
      relations: ['instructor'],
    });
    if (courses.length === 0) {
      throw new Error('No courses found in cart');
    }

    const amount = courses.reduce((acc, course) => acc + parseFloat(course.price as any), 0);
    console.log('type profile:', typeof this.profileId);
    console.log('profileId:', this.profileId);
    console.log('serverKey:', this.serverKey);
    console.log('type of amount:', typeof amount);

    const payload = {
      profile_id: parseInt(this.profileId!),
      tran_type: 'auth',
      tran_class: 'ecom',
      cart_id: `cart:${user.id}`,
      cart_description: `cart:${user.id}`,
      cart_currency: 'EGP',
      cart_amount: amount,
      callback: 'https://webhook.site/504001e2-b3e1-4d08-bb87-c74c2776d550',
      return: 'https://webhook.site/504001e2-b3e1-4d08-bb87-c74c2776d550',
      customer_details: {
        name: user.username,
        email: user.email,
        phone: '01234567890',
        street1: 'menasha',
        city: 'Alexandria',
        state: 'al',
        country: 'EG',
        zip: '52121',
      },
      shipping_details: {
        name: user.username,
        email: user.email,
        phone: '01234567890',
        street1: 'menasha',
        city: 'Alexandria',
        state: 'al',
        country: 'EG',
        zip: '52121',
      },
    };

    const response = await axios.post(`${this.baseUrl}/payment/request`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.serverKey,
      },
    });

    return response.data;
  }

  async verifyTransaction(tranRef: string): Promise<any> {
    const payload = {
      profile_id: parseInt(this.profileId!),
      tran_ref: tranRef,
    };

    console.log('before verifyTransaction payload');
    const response = await axios.post(`${this.baseUrl}/payment/query`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.serverKey,
      },
    });
    console.log('after verifyTransaction payload');

    return response.data;
  }

  async captureTransaction(tranRef: string, cartId: string, cartDescription: string, amount: string): Promise<any> {
    const payload = {
      profile_id: parseInt(this.profileId!),
      tran_ref: tranRef,
      tran_type: 'capture',
      cart_id: cartId,
      cart_description: cartDescription,
      cart_amount: amount,
      tran_class: 'ecom',
      cart_currency: 'EGP',
    };

    const response = await axios.post(`${this.baseUrl}/payment/request`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.serverKey,
      },
    });

    return response.data;
  }

  async voidTransaction(tranRef: string, cartId: string, cartDescription: string, amount: string): Promise<any> {
    const payload = {
      profile_id: parseInt(this.profileId!),
      tran_ref: tranRef,
      tran_class: 'ecom',
      tran_type: 'void',
      cart_id: cartId,
      cart_description: cartDescription,
      cart_currency: 'EGP',
      cart_amount: amount
    };

    const response = await axios.post(`${this.baseUrl}/payment/request`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.serverKey,
      },
    });

    return response.data;
  }

  // async refundTransaction(tranRef: string, amount: number): Promise<any> {
  //   const payload = {
  //     profile_id: parseInt(this.profileId!),
  //     tran_ref: tranRef,
  //     tran_type: 'refund',
  //     amount: amount.toFixed(2),
  //   };

  //   const response = await axios.post(`${this.baseUrl}/payment/request`, payload, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: this.serverKey,
  //     },
  //   });

  //   return response.data;
  // }
}
