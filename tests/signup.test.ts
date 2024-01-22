import { expect, describe, it} from '@jest/globals'
import {signup} from '../src/signup'
import {getAccount} from '../src/getAccount'
import { makeAccount } from './accout.factory'
import { ICreateAccount } from '../src/ICreateAccount.interface'
describe('Signup',() => {

  let input: ICreateAccount;

  beforeEach(()=>{
    input = makeAccount();
  })

  it('should create a new passenger account',async ()=>{
    const responseSingup = await signup(input)
    const responseGetAccount = await getAccount(responseSingup.accountId)

    expect(responseSingup.accountId).toBeDefined()
    expect(responseGetAccount?.name).toEqual('Teste da Silva')
    expect(responseGetAccount?.email).toEqual(input.email)
    expect(responseGetAccount?.cpf).toEqual('88848336043')
    expect(responseGetAccount?.isPassenger).toBe(true)
  })
  it('should create a new driver account',async ()=>{

    const responseSingup = await signup(input)
    const responseGetAccount = await getAccount(responseSingup.accountId)

    expect(responseSingup.accountId).toBeDefined()
    expect(responseGetAccount?.name).toEqual('Teste da Silva')
    expect(responseGetAccount?.email).toEqual(input.email)
    expect(responseGetAccount?.cpf).toEqual('88848336043')
    expect(responseGetAccount?.isDriver).toBe(true)
  })
  
  it('should throw an error if email already exists',async ()=>{
    await signup(input)

    await expect(()=>{
      return  signup(input)
    }).rejects.toThrowError('Email already exists')
  })
  it('should throw an error if name is invalid',async ()=>{
    const input = makeAccount({
      name: '!@Teste da Silva11'
    });
    await expect(()=>{
      return  signup(input)
    }).rejects.toThrowError('Invalid name')
  })
  it('should throw an error if email is invalid',async ()=>{
    const input = makeAccount({
      email: `testesilva${Math.random()}`
    });
    await expect(()=>{
      return  signup(input)
    }).rejects.toThrowError('Invalid email')
  })
  it('should throw an error if CPF is invalid',async ()=>{
    const input = makeAccount({
      cpf: '97456321000',
    });
    await expect(()=>{
      return  signup(input)
    }).rejects.toThrowError('Invalid CPF')
  })
  it('should throw an error if user is driver and car plate is invalid',async ()=>{
    const input = makeAccount({
      carPlate: 'ABC-1234',
    });
    await expect(()=>{
      return  signup(input)
    }).rejects.toThrowError('Invalid Car Plate')
  })
})