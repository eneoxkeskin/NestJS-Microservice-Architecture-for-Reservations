import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDocument } from './users/models/user.schema'; 
import { TokenPayload } from './interface/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response): Promise<string> {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(), // Noktalı virgülü virgüle çevirdim
    };

    // Token geçerlilik süresini ayarla
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'),
    );

    // Token oluştur
    const token = this.jwtService.sign(tokenPayload);

    // Cookie ayarla
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires, // Cookie'nin geçerlilik süresi
    });

    return token; // Token döndür
  }
}
