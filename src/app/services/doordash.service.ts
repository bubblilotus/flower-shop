import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class DoordashService {

  constructor() { }
  generateKey() {
    // var require: any;
    var jwt = require('jsonwebtoken');

    var accessKey = {
      developer_id: '3ba116b7-7143-4016-9e70-7472e4989568', 
      key_id: '6e4aa726-8a66-46fa-b70a-51fa24ce6766',
      signing_secret: 'HLcgva+sgysND+JbMb8mymt/Jep8xBSqycw2gQgrLN2jKHFBCyZ/DrPbcazteCNW'
    };

    var data = {
      aud: 'doordash',
      iss: accessKey.developer_id,
      kid: accessKey.key_id,
      exp: Math.floor(Date.now() / 1000 + 300),
      iat: Math.floor(Date.now() / 1000),
    }

    var headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } }

    var token = jwt.sign(
      data,
      Buffer.from(accessKey.signing_secret, 'base64'),
      headers,
    );

    console.log(token);
  }
}
