"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PMCChanges = void 0;
const GlobalValues_1 = require("./GlobalValues");
const PMCChanges = (container) => {
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> PMCChanges Started");
    const PMC = GlobalValues_1.globalValues.configServer.getConfig("aki-pmc");
    PMC.convertIntoPmcChance.assault.min = GlobalValues_1.globalValues.config.PMCChanges.SkavToPMC;
    PMC.convertIntoPmcChance.assault.max = GlobalValues_1.globalValues.config.PMCChanges.SkavToPMC;
    PMC.convertIntoPmcChance.cursedassault.min = GlobalValues_1.globalValues.config.PMCChanges.CursedSkavToPMC;
    PMC.convertIntoPmcChance.cursedassault.max = GlobalValues_1.globalValues.config.PMCChanges.CursedSkavToPMC;
    PMC.convertIntoPmcChance.pmcbot.min = GlobalValues_1.globalValues.config.PMCChanges.RaiderToPMC;
    PMC.convertIntoPmcChance.pmcbot.max = GlobalValues_1.globalValues.config.PMCChanges.RaiderToPMC;
    PMC.convertIntoPmcChance.exusec.min = GlobalValues_1.globalValues.config.PMCChanges.RogueToPMC;
    PMC.convertIntoPmcChance.exusec.max = GlobalValues_1.globalValues.config.PMCChanges.RogueToPMC;
    PMC.convertIntoPmcChance.marksman = {};
    PMC.convertIntoPmcChance.marksman.min = GlobalValues_1.globalValues.config.PMCChanges.SniperToPMC;
    PMC.convertIntoPmcChance.marksman.max = GlobalValues_1.globalValues.config.PMCChanges.SniperToPMC;
    PMC.isUsec = GlobalValues_1.globalValues.config.PMCChanges.UsecRatio;
    PMC.chanceSameSideIsHostilePercent = GlobalValues_1.globalValues.config.PMCChanges.ChanceSameSideHostile;
    PMC.botRelativeLevelDeltaMax = GlobalValues_1.globalValues.config.PMCChanges.MaxLevelDelta;
    PMC.looseWeaponInBackpackChancePercent = GlobalValues_1.globalValues.config.PMCChanges.PMCBackPackWeapons;
    PMC.weaponHasEnhancementChancePercent = GlobalValues_1.globalValues.config.PMCChanges.PMCWeaponsEnhanced;
    PMC.addPrefixToSameNamePMCAsPlayerChance = GlobalValues_1.globalValues.config.PMCChanges.PMCNamePrefix;
    PMC.allPMCsHavePlayerNameWithRandomPrefixChance = GlobalValues_1.globalValues.config.PMCChanges.AllPMCNamePrefix;
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> PMCChanges Complete");
};
exports.PMCChanges = PMCChanges;
//# sourceMappingURL=PMChanges.js.map