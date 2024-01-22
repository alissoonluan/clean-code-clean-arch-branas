import { expect, describe, it} from '@jest/globals'
import axios from 'axios'
import { makeAccount } from './accout.factory';
import { ICreateAccount } from '../src/ICreateAccount.interface';

describe('Server',()=>{
  let input: ICreateAccount;

  beforeEach(()=>{
    input = makeAccount();
  })

  it('should be able to POST signup on route /signup ',async ()=>{

    const response = await axios.post('http://localhost:3000/signup',input);

    expect(response.status).toBe(201)
    expect(response.data.accountId).toBeDefined()
  })
  it('should be able to GET account by id on route /account/:accountId ',async ()=>{
    
    const responseSignup = await axios.post('http://localhost:3000/signup',input);
    const responseAccount = await axios.get(`http://localhost:3000/account/${responseSignup.data.accountId}`);

    expect(responseAccount.status).toBe(200)
    expect(responseAccount.data.name).toEqual('Teste da Silva')
    expect(responseAccount.data.email).toEqual(input.email)
    expect(responseAccount.data.cpf).toEqual('88848336043')
    expect(responseAccount.data.isPassenger).toBe(true)
  })
})