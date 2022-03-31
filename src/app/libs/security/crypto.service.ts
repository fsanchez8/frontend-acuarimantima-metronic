import { Injectable } from '@angular/core';
import { KEYSCRYPTO } from '../constants/encrypt.constant';
import * as crypto from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  public key: string;
  public iv : string;
  
  constructor() { 
    this.key = "";
    this.iv = "";
    this.loadCryptoConfig();
  }

  public loadCryptoConfig(){
    this.key =  KEYSCRYPTO.key;
    this.iv  =  KEYSCRYPTO.iv
  }

  public encryptAES(input : string) : any{
    return this.encryptScriptToBytesAES(input, this.key, this.iv);
  }

  public decryptAES(input : string) : any{
    return this.decryptScriptToBytesAES(input , this.key, this.iv);
  }

  public encryptScriptToBytesAES(password: string, key: string, iv: any ){
    if(!password || !key || !iv){
      return undefined;
    } 
    return crypto.AES.encrypt(password, key, {
      iv:iv, 
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    })
  }

  public decryptScriptToBytesAES(cipherText: string, key: string, iv: any){
    if(!cipherText || !key || !iv){
      return undefined;
    } 

    return crypto.AES.decrypt(cipherText, key, {
      iv:iv, 
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    }).toString(crypto.enc.Utf8);
  }


}
