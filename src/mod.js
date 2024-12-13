"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HideOutChanges_1 = require("./HideOutChanges");
const LootChanges_1 = require("./LootChanges");
const BossChanges_1 = require("./BossChanges");
const AirdropChanges_1 = require("./AirdropChanges");
const PMChanges_1 = require("./PMChanges");
const GlobalValues_1 = require("./GlobalValues");
const BotGenerator_1 = require("./BotGenerator");
const DifficultyChanges_1 = require("./DifficultyChanges");
class Mod {
    preAkiLoad(container) {
        // Set up global values
        GlobalValues_1.globalValues.database = container.resolve("DatabaseServer").getTables();
        GlobalValues_1.globalValues.configServer = container.resolve("ConfigServer");
        GlobalValues_1.globalValues.Logger = container.resolve("WinstonLogger");
        GlobalValues_1.globalValues.Logger.info("[MatMod] preAkiLoad");
        (0, BotGenerator_1.BotGeneratorAndRouter)(container);
        GlobalValues_1.globalValues.Logger.info("[MatMod] preAkiLoad Complete");
    }
    postAkiLoad(container) {
        GlobalValues_1.globalValues.database = container.resolve("DatabaseServer").getTables();
        GlobalValues_1.globalValues.configServer = container.resolve("ConfigServer");
        GlobalValues_1.globalValues.Logger = container.resolve("WinstonLogger");
        GlobalValues_1.globalValues.Logger.info("[MatMod] postAkiLoad");
        if (GlobalValues_1.globalValues.config.BotDifficulty.modifyCoreDifficulty) {
            (0, DifficultyChanges_1.DifficultyChanges)();
        }
        if (GlobalValues_1.globalValues.config.HideOut.fastHideoutConstruction && GlobalValues_1.globalValues.config.HideOut.fastHideoutProduction) {
            (0, HideOutChanges_1.HideOutFastConstruction)(container);
        }
        (0, LootChanges_1.ModifyLoot)(container);
        if (GlobalValues_1.globalValues.config.modifyBosses) {
            (0, BossChanges_1.BossChanges)(container);
        }
        if (GlobalValues_1.globalValues.config.Airdrops.modifyAirdrops) {
            (0, AirdropChanges_1.ModifyAirdrops)(container);
        }
        if (GlobalValues_1.globalValues.config.PMCChanges.MakePMCChanges) {
            (0, PMChanges_1.PMCChanges)(container);
        }
        (0, BotGenerator_1.SetBotMaxCaps)(container);
        // Lots of Snow !! Winter Event
        const weatherConfig = GlobalValues_1.globalValues.configServer.getConfig("aki-weather");
        weatherConfig.forceWinterEvent = GlobalValues_1.globalValues.config.winterEvent;
        // Fix quests (remove)
        // Burning Rubber
        GlobalValues_1.globalValues.database.templates.quests["657315e270bb0b8dba00cc48"].conditions.Fail = [];
        // Shooting Cans
        GlobalValues_1.globalValues.database.templates.quests["657315df034d76585f032e01"].conditions.Fail = [];
        // First in Line
        GlobalValues_1.globalValues.database.templates.quests["657315ddab5a49b71f098853"].conditions.Fail = [];
        // Luxurious Life
        GlobalValues_1.globalValues.database.templates.quests["657315e1dccd301f1301416a"].conditions.Fail = [];
        // Saving The Mole
        GlobalValues_1.globalValues.database.templates.quests["657315e4a6af4ab4b50f3459"].conditions.Fail = [];
        GlobalValues_1.globalValues.Logger.info("[MatMod] postAkiLoad Complete");
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map