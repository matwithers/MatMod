"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyAirdrops = void 0;
const GlobalValues_1 = require("./GlobalValues");
const ModifyAirdrops = (container) => {
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> ModifyAirdrops Started");
    const locations = GlobalValues_1.globalValues.database.locations;
    // Airdrop Settings
    locations.bigmap.base.AirdropParameters.PlaneAirdropChance = GlobalValues_1.globalValues.config.Airdrops.planeAirdropChance;
    locations.bigmap.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = GlobalValues_1.globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.interchange.base.AirdropParameters.PlaneAirdropChance = GlobalValues_1.globalValues.config.Airdrops.planeAirdropChance;
    locations.interchange.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = GlobalValues_1.globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.lighthouse.base.AirdropParameters.PlaneAirdropChance = GlobalValues_1.globalValues.config.Airdrops.planeAirdropChance;
    locations.lighthouse.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = GlobalValues_1.globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.rezervbase.base.AirdropParameters.PlaneAirdropChance = GlobalValues_1.globalValues.config.Airdrops.planeAirdropChance;
    locations.rezervbase.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = GlobalValues_1.globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.shoreline.base.AirdropParameters.PlaneAirdropChance = GlobalValues_1.globalValues.config.Airdrops.planeAirdropChance;
    locations.shoreline.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = GlobalValues_1.globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.tarkovstreets.base.AirdropParameters.PlaneAirdropChance = GlobalValues_1.globalValues.config.Airdrops.planeAirdropChance;
    locations.tarkovstreets.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = GlobalValues_1.globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    locations.woods.base.AirdropParameters.PlaneAirdropChance = GlobalValues_1.globalValues.config.Airdrops.planeAirdropChance;
    locations.woods.base.AirdropParameters.MinPlayersCountToSpawnAirdrop = GlobalValues_1.globalValues.config.Airdrops.minPlayersCountToSpawnAirdrop;
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> ModifyAirdrops Complete");
};
exports.ModifyAirdrops = ModifyAirdrops;
//# sourceMappingURL=AirdropChanges.js.map