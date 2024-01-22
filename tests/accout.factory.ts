import { Account } from "../src/getAccount";

export interface CreateAccountInput extends Omit<Account,'accountId'> {

}

type Override = Partial<Account>;

export function makeAccount(override: Override = {}): CreateAccountInput {
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
