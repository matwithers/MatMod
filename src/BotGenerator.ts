import { DependencyContainer } from 'tsyringe';
import { globalValues } from "./GlobalValues";
import { BotGenerationCacheService } from '@spt-aki/services/BotGenerationCacheService';
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";

export const BotGeneratorAndRouter = (container: DependencyContainer): undefined => {
    globalValues.config.debug && globalValues.Logger.info(" ==> BotGeneratorAndRouter Started");

    globalValues.botGenerationCacheService = container.resolve<BotGenerationCacheService>("BotGenerationCacheService")

    container.afterResolution("BotGenerationCacheService", (_t, result: BotGenerationCacheService) => {
        result.getBot = BotGen.getBot;
    }, { frequency: "Always" });
    globalValues.config.debug && globalValues.Logger.info(" ==> BotGeneratorAndRouter: BotGenerationCacheService Registered")

    globalValues.config.debug && globalValues.Logger.info(" ==> BotGeneratorAndRouter Complete");
}

export const SetBotMaxCaps = (container: DependencyContainer): undefined => {
    globalValues.config.debug && globalValues.Logger.info(" ==> SetBotMaxCaps Started");


    const locations = globalValues.database.locations;
    const bots = globalValues.configServer.getConfig("aki-bot");

    let skip = ["base", "develop", "hideout", "privatearea", "suburbs", "terminal", "town"];
    for (let loc in locations) {
        if (skip.includes(loc)) continue;

        // Set limits on bot counts
        // Not sure if base.BotMax does anything - but added it anyway
        locations[loc].base.MaxBotPerZone = globalValues.config.Maps[loc].BotNumbers.maxBotsPerZone;
        locations[loc].base.BotMaxPlayer = globalValues.config.Maps[loc].BotNumbers.maxPlayers;
        locations[loc].base.BotMax = globalValues.config.Maps[loc].BotNumbers.maxBots;
        bots.maxBotCap[loc] = globalValues.config.Maps[loc].BotNumbers.maxBots;

        // multiply wave slot max and mins by wave multiplier 
        for (let wave in locations[loc].base.waves) {
            let min_slots = locations[loc].base.waves[wave].slots_min;
            let max_slots = locations[loc].base.waves[wave].slots_max;
            if (min_slots > locations[loc].base.MaxBotPerZone) {
                min_slots = locations[loc].base.MaxBotPerZone
            }
            if (max_slots > locations[loc].base.MaxBotPerZone) {
                max_slots = locations[loc].base.MaxBotPerZone
            }
            
            locations[loc].base.waves[wave].slots_min = min_slots * globalValues.config.Maps[loc].BotNumbers.waveMultiplier;
            locations[loc].base.waves[wave].slots_max = max_slots * globalValues.config.Maps[loc].BotNumbers.waveMultiplier;
        }

        // Set Bot Location Modifiers
        let accuracySpeed = globalValues.config.Maps[loc].BotLocationModifier.AccuracySpeed || locations[loc].base.BotLocationModifier.AccuracySpeed;
        locations[loc].base.BotLocationModifier.AccuracySpeed = accuracySpeed;
        let distToActivate = globalValues.config.Maps[loc].BotLocationModifier.DistToActivate || locations[loc].base.BotLocationModifier.DistToActivate;
        locations[loc].base.BotLocationModifier.DistToActivate = distToActivate;
        let distToPersueAxemanCoef = globalValues.config.Maps[loc].BotLocationModifier.DistToPersueAxemanCoef || locations[loc].base.BotLocationModifier.DistToPersueAxemanCoef;
        locations[loc].base.BotLocationModifier.DistToPersueAxemanCoef = distToPersueAxemanCoef;
        let distToSleep = globalValues.config.Maps[loc].BotLocationModifier.DistToSleep || locations[loc].base.BotLocationModifier.DistToSleep;
        locations[loc].base.BotLocationModifier.DistToSleep = distToSleep;
        let gainSight = globalValues.config.Maps[loc].BotLocationModifier.GainSight || locations[loc].base.BotLocationModifier.GainSight;
        locations[loc].base.BotLocationModifier.GainSight = gainSight;
        let khorovodChance = globalValues.config.Maps[loc].BotLocationModifier.KhorovodChance || locations[loc].base.BotLocationModifier.KhorovodChance;
        locations[loc].base.BotLocationModifier.KhorovodChance = khorovodChance;
        let magnetPower = globalValues.config.Maps[loc].BotLocationModifier.MagnetPower || locations[loc].base.BotLocationModifier.MagnetPower;
        locations[loc].base.BotLocationModifier.MagnetPower = magnetPower
        let marksmanAccuratyCoef = globalValues.config.Maps[loc].BotLocationModifier.MarksmanAccuratyCoef || locations[loc].base.BotLocationModifier.MarksmanAccuratyCoef;
        locations[loc].base.BotLocationModifier.MarksmanAccuratyCoef = marksmanAccuratyCoef;
        let scattering = globalValues.config.Maps[loc].BotLocationModifier.Scattering || locations[loc].base.BotLocationModifier.Scattering;
        locations[loc].base.BotLocationModifier.Scattering = scattering;
        let visibleDistance = globalValues.config.Maps[loc].BotLocationModifier.VisibleDistance || locations[loc].base.BotLocationModifier.VisibleDistance;
        locations[loc].base.BotLocationModifier.VisibleDistance = visibleDistance;

    }
    globalValues.config.debug && globalValues.Logger.info(" ==> SetBotMaxCaps Complete");
}

export default class BotGen {
    public static assaultTypes: string[] = [
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

    public static bearTypes: string[] = [
        "sptbeareasy",
        "sptbearnormal",
        "sptbearhard",
        "sptbearimpossible"
    ];

    public static usecTypes: string[] = [
        "sptuseceasy",
        "sptusecnormal",
        "sptusechard",
        "sptusecimpossible"
    ];

    public static marksmanTypes: string[] = [
        "marksmaneasy",
        "marksmannormal",
        "marksmanhard",
        "marksmanimpossible"
    ];

    public static sectantPriestTypes: string[] = [
        "sectantpriesteasy",
        "sectantpriestnormal",
        "sectantpriesthard",
        "sectantpriestimpossible"
    ];

    public static sectantWarriorTypes: string[] = [
        "sectantwarrioreasy",
        "sectantwarriornormal",
        "sectantwarriorhard",
        "sectantwarriorimpossible"
    ];

    static getRandomDifficulty() {
        let roll = Math.random() * 100;

        let impossibleChance = globalValues.config.BotGen.botImpossiblePercent;
        let hardChance = globalValues.config.BotGen.botHardPercent;
        let normalChance = globalValues.config.BotGen.botNormalPercent;

        let chanceLower = 100 - impossibleChance;
        if (impossibleChance > 0 && roll > chanceLower) {
            return "impossible"
        }
        chanceLower = chanceLower - hardChance;
        if (hardChance > 0 && roll > chanceLower) {
            return "hard"
        }
        chanceLower = chanceLower - normalChance;
        if (normalChance > 0 && roll > chanceLower) {
            return "normal"
        }
        return "easy";
    }

    static getRandomRole(roles: Array<string>) {
        let option_count = roles.length;
        let roll = Math.floor(Math.random() * option_count);
        return roles[roll];
    }

    static getBot(key: string): IBotBase {
        globalValues.config.debug && globalValues.Logger.info(` ==> ====================================================`);
        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - requested bot type ${key} from cache`);
        if ((globalValues.botGenerationCacheService as any).storedBots.has(key)) {
            const cachedOfType: IBotBase[] = (globalValues.botGenerationCacheService as any).storedBots.get(key);

            if (cachedOfType.length > 0) {
                const cachedBot = cachedOfType[cachedOfType.length - 1];
                switch (true) {
                    // Scav
                    case BotGen.assaultTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty()
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(globalValues.config.BotGen.assault_roles);
                        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - Creating Scav from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // PMC Bear
                    case BotGen.bearTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty()
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(globalValues.config.BotGen.bear_roles);
                        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - Creating bear from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // PMC USEC
                    case BotGen.usecTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty()
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(globalValues.config.BotGen.usec_roles);
                        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - Creating usec from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // Marksman Skav
                    case BotGen.marksmanTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty()
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(globalValues.config.BotGen.marksman_roles);
                        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - Creating Marksman from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // Cultist Priest
                    case BotGen.sectantPriestTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty()
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(globalValues.config.BotGen.sectant_priest_roles);
                        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - Creating sectantPriest from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    // Cultist Warrior
                    case BotGen.sectantWarriorTypes.includes(key.toLowerCase()):
                        cachedBot.Info.Settings.BotDifficulty = BotGen.getRandomDifficulty()
                        cachedBot.Info.Settings.Role = BotGen.getRandomRole(globalValues.config.BotGen.sectant_warrior_roles);
                        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - Creating sectantWarrior from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;
                    default:
                        globalValues.config.debug && globalValues.Logger.info(` ==> BotGen:getBot - Creating Default spawn from ${key} Role:${cachedBot.Info.Settings.Role} BotDifficulty:${cachedBot.Info.Settings.BotDifficulty} Faction:${cachedBot.Info.Side}`);
                        break;

                }
                globalValues.config.debug && globalValues.Logger.info(` ==> ====================================================`);
                return cachedOfType.pop()
            }

            globalValues.Logger.error((globalValues.botGenerationCacheService as any).localisationService.getText("bot-cache_has_zero_bots_of_requested_type", key));

        }

        globalValues.Logger.error((globalValues.botGenerationCacheService as any).localisationService.getText("bot-no_bot_type_in_cache", key));

        return undefined;
    }
}