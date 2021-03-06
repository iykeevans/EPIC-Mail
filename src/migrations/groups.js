import pool from '../config';

const creategroupTable = `DROP TABLE IF EXISTS groups CASCADE;
  CREATE TABLE groups (
  id SERIAL PRIMARY KEY NOT NULL,
  name CHARACTER VARYING(255) NOT NULL,
  creator CHARACTER VARYING(255) NOT NULL,
  role CHARACTER VARYING(100) NOT NULL DEFAULT ('admin'),
  createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (creator) references users (email) on delete CASCADE
)`;

export default async function groupTable() {
  try {
    const create = await pool.query(creategroupTable);
    console.log(`groupTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(error);
  }
}
