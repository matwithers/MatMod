import { IPreAkiLoadMod } from './../../AlgorithmicQuestRandomizer/types/models/external/IPreAkiLoadMod.d';
import { IPostAkiLoadMod } from "./../types/models/external/IPostAkiLoadMod.d";
import { DependencyContainer } from "tsyringe";
import { HideOutFastConstruction } from './HideOutChanges';
import { ModifyLoot } from './LootChanges';
import { BossChanges } from './BossChanges';
import { ModifyAirdrops } from './AirdropChanges';
import { PMCChanges } from './PMChanges';
import { globalValues } from './GlobalValues';
import { DatabaseServer } from '@spt-aki/servers/DatabaseServer';
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { BotGeneratorAndRouter, SetBotMaxCaps} from './BotGenerator';
import { DifficultyChanges } from './DifficultyChanges';

class Mod implements IPreAkiLoadMod, IPostAkiLoadMod {

    preAkiLoad(container: DependencyContainer): void {
        // Set up global values
        globalValues.database = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        globalValues.configServer = container.resolve<ConfigServer>("ConfigServer");
        globalValues.Logger = container.resolve("WinstonLogger")

        globalValues.Logger.info("[MatMod] preAkiLoad");

        BotGeneratorAndRouter(container);

        globalValues.Logger.info("[MatMod] preAkiLoad Complete");
    }

    postAkiLoad(container: DependencyContainer): void {
        globalValues.database = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        globalValues.configServer = container.resolve<ConfigServer>("ConfigServer");
        globalValues.Logger = container.resolve("WinstonLogger")

        globalValues.Logger.info("[MatMod] postAkiLoad");

        if (globalValues.config.BotDifficulty.modifyCoreDifficulty) {
            DifficultyChanges();
        }
        
        if (globalValues.config.HideOut.fastHideoutConstruction && globalValues.config.HideOut.fastHideoutProduction) {
            HideOutFastConstruction(container);
        }
        
        ModifyLoot(container);

        if (globalValues.config.modifyBosses) {
            BossChanges(container);
        }

        if (globalValues.config.Airdrops.modifyAirdrops) {
            ModifyAirdrops(container);
        }

        if (globalValues.config.PMCChanges.MakePMCChanges) {
            PMCChanges(container);
        }

        SetBotMaxCaps(container);

        // Lots of Snow !! Winter Event
        const weatherConfig = globalValues.configServer.getConfig("aki-weather");
        weatherConfig.forceWinterEvent = globalValues.config.winterEvent;

        // Fix quests (remove)
        // Burning Rubber
        globalValues.database.templates.quests["657315e270bb0b8dba00cc48"].conditions.Fail = [];
        // Shooting Cans
        globalValues.database.templates.quests["657315df034d76585f032e01"].conditions.Fail = [];
        // First in Line
        globalValues.database.templates.quests["657315ddab5a49b71f098853"].conditions.Fail = [];
        // Luxurious Life
        globalValues.database.templates.quests["657315e1dccd301f1301416a"].conditions.Fail = [];
        // Saving The Mole
        globalValues.database.templates.quests["657315e4a6af4ab4b50f3459"].conditions.Fail = [];

        globalValues.Logger.info("[MatMod] postAkiLoad Complete");
    }
}

module.exports = { mod: new Mod() }