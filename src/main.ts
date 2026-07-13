import { db } from "./database/connection";
import {MainMenu} from "./menus/mainMenu";

async function main(): Promise<void> {

    try {

        // testa a conexão com o banco
        await db.query("SELECT NOW()");

        console.log("✅ Banco conectado com sucesso!");

        // inicia o menu principal
        const menu = new MainMenu();

        await menu.show();

    } catch (error) {

        console.error("Erro ao iniciar aplicação:", error);

    } finally {

        // fecha a conexão ao encerrar o sistema
        await db.end();

        console.log("Conexão encerrada.");

    }

}

main();