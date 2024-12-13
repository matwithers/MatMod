import { DependencyContainer } from 'tsyringe';
import { globalValues } from "./GlobalValues";

export const PMCChanges = (container: DependencyContainer): undefined => {
    globalValues.config.debug && globalValues.Logger.info(" ==> PMCChanges Started");

    const PMC = globalValues.configServer.getConfig("aki-pmc")

    PMC.convertIntoPmcChance.assault.min = globalValues.config.PMCChanges.SkavToPMC;
    PMC.convertIntoPmcChance.assault.max = globalValues.config.PMCChanges.SkavToPMC;
    PMC.convertIntoPmcChance.cursedassault.min = globalValues.config.PMCChanges.CursedSkavToPMC;
    PMC.convertIntoPmcChance.cursedassault.max = globalValues.config.PMCChanges.CursedSkavToPMC;
    PMC.convertIntoPmcChance.pmcbot.min = globalValues.config.PMCChanges.RaiderToPMC;
    PMC.convertIntoPmcChance.pmcbot.max = globalValues.config.PMCChanges.RaiderToPMC;
    PMC.convertIntoPmcChance.exusec.min = globalValues.config.PMCChanges.RogueToPMC;
    PMC.convertIntoPmcChance.exusec.max = globalValues.config.PMCChanges.RogueToPMC;
    PMC.convertIntoPmcChance.marksman = {};
    PMC.convertIntoPmcChance.marksman.min = globalValues.config.PMCChanges.SniperToPMC;
    PMC.convertIntoPmcChance.marksman.max = globalValues.config.PMCChanges.SniperToPMC;

    PMC.isUsec = globalValues.config.PMCChanges.UsecRatio;
    PMC.chanceSameSideIsHostilePercent = globalValues.config.PMCChanges.ChanceSameSideHostile;
    PMC.botRelativeLevelDeltaMax = globalValues.config.PMCChanges.MaxLevelDelta;
    PMC.looseWeaponInBackpackChancePercent = globalValues.config.PMCChanges.PMCBackPackWeapons;
    PMC.weaponHasEnhancementChancePercent = globalValues.config.PMCChanges.PMCWeaponsEnhanced;
    PMC.addPrefixToSameNamePMCAsPlayerChance = globalValues.config.PMCChanges.PMCNamePrefix;
    PMC.allPMCsHavePlayerNameWithRandomPrefixChance = globalValues.config.PMCChanges.AllPMCNamePrefix;

    globalValues.config.debug && globalValues.Logger.info(" ==> PMCChanges Complete");
}