import { IAccount } from "./IAccount.interface";
import { connection } from "./databaseConnection";


interface DatabaseAccount extends Omit<IAccount, 'carPlate' | 'isPassenger' | 'isDriver' | 'accountId'> {
  car_plate?: string;
  is_driver: boolean;
  is_passenger?: boolean;
  account_id: string;
}


function mapperAccount(account: DatabaseAccount): IAccount {
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

export async function getAccount(accountId: string): Promise<IAccount | null> {
  const [account] = await connection.query("select * from cccat15.account where account_id = $1", [accountId]);

	if (!account) return null

  return mapperAccount(account);
}