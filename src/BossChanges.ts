import { DependencyContainer } from 'tsyringe';
import { globalValues } from "./GlobalValues";

export const BossChanges = (container: DependencyContainer): undefined => {
    globalValues.config.debug && globalValues.Logger.info(" ==> BossChanges Started");

    const locations = globalValues.database.locations;

    // Boss Spawn Chances
    // Tagilla - Factory
    locations.factory4_day.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.factory4_day.Bosses.tagilla;

    locations.factory4_night.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.factory4_night.Bosses.tagilla;
    // Nightime Cultists
    locations.factory4_night.base.BossLocationSpawn[1].BossChance = globalValues.config.Maps.factory4_night.Bosses.cultists;

    // Goons - Customs
    locations.bigmap.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.bigmap.Bosses.goons;
    // Reshala - Customs
    locations.bigmap.base.BossLocationSpawn[1].BossChance = globalValues.config.Maps.bigmap.Bosses.reshala;
    // Cultists - Customs
    locations.bigmap.base.BossLocationSpawn[2].BossChance = globalValues.config.Maps.bigmap.Bosses.cultists;
    // arenaFighterEvent (No Thanks)
    locations.bigmap.base.BossLocationSpawn[3].BossChance = 0;

    // Killa - Interchange
    locations.interchange.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.interchange.Bosses.killa;

    // Labs - Only has Raiders
    //

    // Goons - Shoreline
    // disabled for now as birdeye annoyingly pings you through walls 
    // when you get within about 100 miles !!
    locations.shoreline.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.shoreline.Bosses.goons;
    // Sanitar - Shoreline
    locations.shoreline.base.BossLocationSpawn[1].BossChance = globalValues.config.Maps.shoreline.Bosses.sanitar;
    // Cultists - Shoreline Gas Station
    locations.shoreline.base.BossLocationSpawn[2].BossChance = globalValues.config.Maps.shoreline.Bosses.cultists_gas_station;
    // Cultists - Shoreline Forest
    locations.shoreline.base.BossLocationSpawn[3].BossChance = globalValues.config.Maps.shoreline.Bosses.cultists_forest;

    // Goons - Woods
    locations.woods.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.woods.Bosses.goons;
    // Sturman - Woods
    locations.woods.base.BossLocationSpawn[1].BossChance = globalValues.config.Maps.woods.Bosses.sturman;
    // Cultists - Woods
    locations.woods.base.BossLocationSpawn[2].BossChance = globalValues.config.Maps.woods.Bosses.cultists;
    // arenaFighterEvent (No Thanks)
    locations.woods.base.BossLocationSpawn[3].BossChance = 0;

    // Gluhar - Reserve
    locations.rezervbase.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.rezervbase.Bosses.gluhar;
    // Raiders - Reserve Rail Yard
    locations.rezervbase.base.BossLocationSpawn[1].BossChance = 40;
    // Raiders - Reserve Rail Yard (Triggered by Exfil)
    locations.rezervbase.base.BossLocationSpawn[2].BossChance = 40;
    // Raiders - Reserve Bunker (Triggered by D2 Lever)
    locations.rezervbase.base.BossLocationSpawn[3].BossChance = 40;
    // Raiders - Reserve Bunker (Random Patrolling)
    locations.rezervbase.base.BossLocationSpawn[4].BossChance = 40;

    // Zryachiy - lighthouse
    locations.lighthouse.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.lighthouse.Bosses.zryachiy;
    // Goons - Lighthouse
    locations.lighthouse.base.BossLocationSpawn[1].BossChance = globalValues.config.Maps.lighthouse.Bosses.goons;
    // Rogues - Zone_Blockpost
    locations.lighthouse.base.BossLocationSpawn[2].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_blockpost;
    // Rogues - Zone_RoofContainers
    locations.lighthouse.base.BossLocationSpawn[3].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_roof_containers;
    // Rogues - Zone_TreatmentRocks
    locations.lighthouse.base.BossLocationSpawn[4].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_treatment_rocks;
    // Rogues - Zone_TreatmentBeach
    locations.lighthouse.base.BossLocationSpawn[5].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_treatment_beach;
    // Rogues - Zone_Island
    locations.lighthouse.base.BossLocationSpawn[6].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_island;
    // Rogues - Zone_RoofRocks
    locations.lighthouse.base.BossLocationSpawn[7].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_roof_rocks;
    // Rogues - Zone_RoofBeach
    locations.lighthouse.base.BossLocationSpawn[8].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_roof_beach;
    // Rogues - Zone_Helicopter
    locations.lighthouse.base.BossLocationSpawn[9].BossChance = globalValues.config.Maps.lighthouse.Bosses.rogues_helicopter;
    // crazyAssaultEvent - No Thanks !
    locations.lighthouse.base.BossLocationSpawn[10].BossChance = 0;


    // Kolontay - Streets of Tarkov
    locations.tarkovstreets.base.BossLocationSpawn[0].BossChance = globalValues.config.Maps.tarkovstreets.Bosses.kolontay;
    // Kaban - Streets of Tarkov
    locations.tarkovstreets.base.BossLocationSpawn[1].BossChance = globalValues.config.Maps.tarkovstreets.Bosses.kaban;
    // Kaban Snipers [1] - 100% chance if Kaban spawns

    // Sandbox - Ground Zero has no bosses

    globalValues.config.debug && globalValues.Logger.info(" ==> BossChanges Complete");
}