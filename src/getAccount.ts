import { connection } from "./databaseConnection";

export interface Account {
  name:string
	email:string
	cpf:string
	password:string
	carPlate?: string
	isPassenger?:boolean
	isDriver?:boolean
	accountId:string
}

interface DatabaseAccount extends Omit<Account, 'carPlate' | 'isPassenger' | 'isDriver' | 'accountId'> {
  car_plate?: string;
  is_driver: boolean;
  is_passenger?: boolean;
  account_id: string;
}


function mapperAccount(account: DatabaseAccount): Account {
	return {
		cpf: account.cpf,
		email: account.email,
		name: account.name,
		password: account.password,
		carPlate: account.car_plate,
		isDriver: account.is_driver,
		isPassenger: account.is_passenger,
		accountId: account.account_id
	}
} 

export async function getAccount(accountId: string): Promise<Account | null> {
  const [account] = await connection.query("select * from cccat15.account where account_id = $1", [accountId]);

	if (!account) return null

  return mapperAccount(account);
}