import { IAccount } from "../src/IAccount.interface";
import { ICreateAccount } from '../src/ICreateAccount.interface';

type Override = Partial<IAccount>;

export function makeAccount(override: Override = {}): ICreateAccount {
  return {
    name:'Teste da Silva',
    email: `testesilva${Math.random()}@usuario.com`,
    cpf: '88848336043',
    password: '123456',
    isPassenger: true,
    isDriver: true,
    carPlate: 'ABC1234',
    ...override
  };
}
