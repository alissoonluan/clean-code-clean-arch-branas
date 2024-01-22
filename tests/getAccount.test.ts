import { getAccount } from '../src/getAccount'
import { signup } from '../src/signup'
import crypto from "crypto";
import { makeAccount } from './accout.factory';

describe('GetAccount',()=>{
  it('should get account by id if it exists',async ()=>{
    const input = makeAccount({
      isDriver: false
    });

    const responseSingup = await signup(input)
    const responseGetAccount = await getAccount(responseSingup.accountId) 
    expect(responseGetAccount).toHaveProperty('name')
    expect(responseGetAccount?.email).toBe(input.email)

  })

it(`should return null if account don't exists`,async ()=>{
    const randomId = crypto.randomUUID();
    const responseGetAccount = await getAccount(randomId) 
    expect(responseGetAccount).toBeNull()   
  })
})