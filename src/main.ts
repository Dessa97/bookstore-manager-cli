import { db } from "./database/connection";
import {MainMenu} from "./menus/mainMenu";

async function start() {
  try {
    await db.query("SELECT NOW()");

    console.log("✅ Banco conectado!");

    const menu = new MainMenu();
    await menu.show();

  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error);
  } finally {
    await db.end();
  }
}

start();