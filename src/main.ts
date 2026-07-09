import { db } from "./database/connection";

async function start() {
  try {
    await db.query("SELECT NOW()");

    console.log("✅ Banco conectado!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

start();