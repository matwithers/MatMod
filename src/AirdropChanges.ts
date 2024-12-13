import { DependencyContainer } from 'tsyringe';
import { globalValues } from "./GlobalValues";

export const ModifyAirdrops = (container: DependencyContainer): undefined => {
    globalValues.config.debug && globalValues.Logger.info(" ==> ModifyAirdrops Started");

    const locations = globalValues.database.locations;

    // Airdrop Settings
    locations.bigmap.base.AirdropParameters.PlaneAirdropChance = globalValues.config.Airdrops.planeAirdropChance;
    locations.bigmap.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.interchange.base.AirdropParameters.PlaneAirdropChance = globalValues.config.Airdrops.planeAirdropChance;
    locations.interchange.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.lighthouse.base.AirdropParameters.PlaneAirdropChance = globalValues.config.Airdrops.planeAirdropChance;
    locations.lighthouse.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.rezervbase.base.AirdropParameters.PlaneAirdropChance = globalValues.config.Airdrops.planeAirdropChance;
    locations.rezervbase.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.shoreline.base.AirdropParameters.PlaneAirdropChance = globalValues.config.Airdrops.planeAirdropChance;
    locations.shoreline.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.tarkovstreets.base.AirdropParameters.PlaneAirdropChance = globalValues.config.Airdrops.planeAirdropChance;
    locations.tarkovstreets.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.woods.base.AirdropParameters.PlaneAirdropChance = globalValues.config.Airdrops.planeAirdropChance;
    locations.woods.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;

    globalValues.config.debug && globalValues.Logger.info(" ==> ModifyAirdrops Complete");
}