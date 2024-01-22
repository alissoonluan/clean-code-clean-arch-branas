import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import { connection } from './databaseConnection';
import { validateAccountByEmail } from "./getAccountByEmail";

export interface Input{
	name:string
	email:string
	cpf:string
	password:string
	carPlate?: string
	isPassenger?:boolean
	isDriver?:boolean
}
export interface Output{
	accountId:string
}

function validateName(name:string){
	const regex = /^[a-zA-Z ]+$/;
	return regex.test(name)
}
function validateEmail(email:string){
	const regex = /^(.+)@(.+)$/;
	return regex.test(email)
}

function validateCarPlate(carPlate:string){
	const regex = /[A-Z]{3}[0-9]{4}/;
	return regex.test(carPlate)
}

function validateInputData(input:Input){
	if (!validateName(input.name)) throw new Error('Invalid name') 
	if (!validateEmail(input.email)) throw new Error('Invalid email') 
	if (!validateCpf(input.cpf)) throw new Error('Invalid CPF')
	if (input.isDriver && !validateCarPlate(input.carPlate!)) throw new Error('Invalid Car Plate')
}

export async function signup (input: Input): Promise<Output> {
	const accountId = crypto.randomUUID();
	await validateAccountByEmail(input.email);
	validateInputData(input)
	await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [accountId, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
	return {accountId};
}