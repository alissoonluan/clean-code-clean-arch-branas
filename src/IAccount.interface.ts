export interface IAccount {
  name:string
	email:string
	cpf:string
	password:string
	carPlate?: string
	isPassenger?:boolean
	isDriver?:boolean
	accountId:string
}
