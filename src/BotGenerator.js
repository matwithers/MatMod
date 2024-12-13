"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetBotMaxCaps = exports.BotGeneratorAndRouter = void 0;
const GlobalValues_1 = require("./GlobalValues");
const BotGeneratorAndRouter = (container) => {
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> BotGeneratorAndRouter Started");
    GlobalValues_1.globalValues.botGenerationCacheService = container.resolve("BotGenerationCacheService");
    container.afterResolution("BotGenerationCacheService", (_t, result) => {
        result.getBot = BotGen.getBot;
    }, { frequency: "Always" });
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> BotGeneratorAndRouter: BotGenerationCacheService Registered");
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> BotGeneratorAndRouter Complete");
};
exports.BotGeneratorAndRouter = BotGeneratorAndRouter;
const SetBotMaxCaps = (container) => {
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> SetBotMaxCaps Started");
    const locations = GlobalValues_1.globalValues.database.locations;
    const bots = GlobalValues_1.globalValues.configServer.getConfig("aki-bot");
    let skip = ["base", "develop", "hideout", "privatearea", "suburbs", "terminal", "town"];
    for (let loc in locations) {
        if (skip.includes(loc))
            continue;
        // Set limits on bot counts
        // Not sure if base.BotMax does anything - but added it anyway
        locations[loc].base.MaxBotPerZone = GlobalValues_1.globalValues.config.Maps[loc].BotNumbers.maxBotsPerZone;
        locations[loc].base.BotMaxPlayer = GlobalValues_1.globalValues.config.Maps[loc].BotNumbers.maxPlayers;
        locations[loc].base.BotMax = GlobalValues_1.globalValues.config.Maps[loc].BotNumbers.maxBots;
        bots.maxBotCap[loc] = GlobalValues_1.globalValues.config.Maps[loc].BotNumbers.maxBots;
        // multiply wave slot max and mins by wave multiplier 
        for (let wave in locations[loc].base.waves) {
            let min_slots = locations[loc].base.waves[wave].slots_min;
            let max_slots = locations[loc].base.waves[wave].slots_max;
            if (min_slots > locations[loc].base.MaxBotPerZone) {
                min_slots = locations[loc].base.MaxBotPerZone;
            }
            if (max_slots > locations[loc].base.MaxBotPerZone) {
                max_slots = locations[loc].base.MaxBotPerZone;
            }
            locations[loc].base.waves[wave].slots_min = min_slots * GlobalValues_1.globalValues.config.Maps[loc].BotNumbers.waveMultiplier;
            locations[loc].base.waves[wave].slots_max = max_slots * GlobalValues_1.globalValues.config.Maps[loc].BotNumbers.waveMultiplier;
        }
        // Set Bot Location Modifiers
        let accuracySpeed = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.AccuracySpeed || locations[loc].base.BotLocationModifier.AccuracySpeed;
        locations[loc].base.BotLocationModifier.AccuracySpeed = accuracySpeed;
        let distToActivate = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.DistToActivate || locations[loc].base.BotLocationModifier.DistToActivate;
        locations[loc].base.BotLocationModifier.DistToActivate = distToActivate;
        let distToPersueAxemanCoef = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.DistToPersueAxemanCoef || locations[loc].base.BotLocationModifier.DistToPersueAxemanCoef;
        locations[loc].base.BotLocationModifier.DistToPersueAxemanCoef = distToPersueAxemanCoef;
        let distToSleep = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.DistToSleep || locations[loc].base.BotLocationModifier.DistToSleep;
        locations[loc].base.BotLocationModifier.DistToSleep = distToSleep;
        let gainSight = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.GainSight || locations[loc].base.BotLocationModifier.GainSight;
        locations[loc].base.BotLocationModifier.GainSight = gainSight;
        let khorovodChance = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.KhorovodChance || locations[loc].base.BotLocationModifier.KhorovodChance;
        locations[loc].base.BotLocationModifier.KhorovodChance = khorovodChance;
        let magnetPower = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.MagnetPower || locations[loc].base.BotLocationModifier.MagnetPower;
        locations[loc].base.BotLocationModifier.MagnetPower = magnetPower;
        let marksmanAccuratyCoef = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.MarksmanAccuratyCoef || locations[loc].base.BotLocationModifier.MarksmanAccuratyCoef;
        locations[loc].base.BotLocationModifier.MarksmanAccuratyCoef = marksmanAccuratyCoef;
        let scattering = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.Scattering || locations[loc].base.BotLocationModifier.Scattering;
        locations[loc].base.BotLocationModifier.Scattering = scattering;
        let visibleDistance = GlobalValues_1.globalValues.config.Maps[loc].BotLocationModifier.VisibleDistance || locations[loc].base.BotLocationModifier.VisibleDistance;
        locations[loc].base.BotLocationModifier.VisibleDistance = visibleDistance;
    }
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> SetBotMaxCaps Complete");
};
exports.SetBotMaxCaps = SetBotMaxCaps;
class BotGen {
    static assaultTypes = [
        "assaulteasy",
        "assaultnormal",
        "assaulthard",
        "cursedassaulteasy",
        "assaultimpossible",
        "cursedassaultnormal",
        "cursedassaulthard",
        "cursedassaultimpossible",
        "arenafightereventeasy",
        "arenafightereventnormal",
        "arenafightereventhard",
        "arenafightereventimpossible",
        "arenafightereasy",
        "arenafighternormal",
        "arenafighterhard",
        "arenafighterimpossible",
        "crazyassaulteventeasy",
        "crazyassaulteventnormal",
        "crazyassaulteventhard",
        "crazyassaulteventimpossible"
    ];
    static bearTypes = [
        "sptbeareasy",
        "sptbearnormal",
        "sptbearhard",
        "sptbearimpossible"
    ];
    static usecTypes = [
        "sptuseceasy",
        "sptusecnormal",
        "sptusechard",
        "sptusecimpossible"
    ];
    static marksmanTypes = [
        "marksmaneasy",
        "marksmannormal",
        "marksmanhard",
        "marksmanimpossible"
    ];
    static sectantPriestTypes = [
        "sectantpriesteasy",
        "sectantpriestnormal",
        "sectantpriesthard",
        "sectantpriestimpossible"
    ];
    static sectantWarriorTypes = [
        "sectantwarrioreasy",
        "sectantwarriornormal",
        "sectantwarriorhard",
        "sectantwarriorimpossible"
    ];
    static getRandomDifficulty() {
        let roll = Math.random() * 100;
        let impossibleChance = GlobalValues_1.globalValues.config.BotGen.botImpossiblePercent;
        let hardChance = GlobalValues_1.globalValues.config.BotGen.botHardPercent;
        let normalChance = GlobalValues_1.globalValues.config.BotGen.botNormalPercent;
        let chanceLower = 100 - impossibleChance;
        if (impossibleChance > 0 && roll > chanceLower) {
            return "impossible";
        }
        chanceLower = chanceLower - hardChance;
        if (hardChance > 0 && roll > chanceLower) {
            return "hard";
        }
        chanceLower = chanceLower - normalChance;
        if (normalChance > 0 && roll > chanceLower) {
            return "normal";
        }
        return "easy";
    }
    static getRandomRole(roles) {
        let option_count = roles.length;
        let roll = Math.floor(Math.random() * option_count);
        return roles[roll];
    }
    static getBot(key) {
        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> ====================================================`);
        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - requested bot type ${key} from cache`);
        if (GlobalValues_1.globalValues.botGenerationCacheService.storedBots.has(key)) {
            const cachedOfType = GlobalValues_1.globalValues.botGenerationCacheService.storedBots.get(key);
            if (cachedOfType.length > 0) {
                const cachedBot = cachedOfType[cachedOfType.length - 1];
                switch (true) {
                    // Scav
                    case BotGen.assaultTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty();
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(GlobalValues_1.globalValues.config.BotGen.assault_roles);
                        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - Creating Scav from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // PMC Bear
                    case BotGen.bearTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty();
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(GlobalValues_1.globalValues.config.BotGen.bear_roles);
                        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - Creating bear from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // PMC USEC
                    case BotGen.usecTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty();
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(GlobalValues_1.globalValues.config.BotGen.usec_roles);
                        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - Creating usec from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // Marksman Skav
                    case BotGen.marksmanTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty();
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(GlobalValues_1.globalValues.config.BotGen.marksman_roles);
                        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - Creating Marksman from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // Cultist Priest
                    case BotGen.sectantPriestTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty();
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(GlobalValues_1.globalValues.config.BotGen.sectant_priest_roles);
                        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - Creating sectantPriest from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // Cultist Warrior
                    case BotGen.sectantWarriorTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty();
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(GlobalValues_1.globalValues.config.BotGen.sectant_warrior_roles);
                        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - Creating sectantWarrior from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    default:
                        GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> BotGen:getBot - Creating Default spawn from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                }
                GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> ====================================================`);
                return cachedOfType.pop();
            }
            GlobalValues_1.globalValues.Logger.error(GlobalValues_1.globalValues.botGenerationCacheService.localisationService.getText("bot-cache_has_zero_bots_of_requested_type", key));
        }
        GlobalValues_1.globalValues.Logger.error(GlobalValues_1.globalValues.botGenerationCacheService.localisationService.getText("bot-no_bot_type_in_cache", key));
        return undefined;
    }
}
exports.default = BotGen;
//# sourceMappingURL=BotGenerator.js.map