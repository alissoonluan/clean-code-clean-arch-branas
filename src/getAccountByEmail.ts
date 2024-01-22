import { connection } from "./databaseConnection";

export async function validateAccountByEmail(email: string) {
  const [account] = await connection.query("select * from cccat15.account where email = $1", [email]);

  if (account) throw new Error("Email already exists");
}