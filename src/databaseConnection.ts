import pgp from "pg-promise";

const connection = pgp()("postgres://postgres:postgres@localhost:5432/postgres");

export { connection };