import { IAccount } from "./IAccount.interface";

export interface ICreateAccount extends Omit<IAccount,'accountId'> {

}