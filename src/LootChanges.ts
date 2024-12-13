import { DependencyContainer } from 'tsyringe';
import { globalValues } from "./GlobalValues";

export const ModifyLoot = (container: DependencyContainer): undefined => {
    globalValues.config.debug && globalValues.Logger.info(" ==> ModifyLoot Started");

    const globals = globalValues.database.globals;
    const loot = globalValues.database.loot;
    
    // Set Global loot chance modifier (loose loot) Default 0.2
    if (globalValues.config.Loot.modifyGlobalLootChance) {
        globals.GlobalLootChanceModifier = globalValues.config.Loot.globalLootChanceModifier;
    }

    const containerLootMultiplier = 0.25;
    // Loot containers
    // jackets - "578f8778245977358849a9b5"
    // PC - "59139c2186f77411564f8e42"
    // Drawer - "578f87b7245977356274f2cd"
    // Wooden Crate - "578f87ad245977356274f2cc"
    // Safe - "578f8782245977354405a1e3"
    // Med Case - "5909d4c186f7746ad34e805a"
    // Tool Box - "5909d50c86f774659e6aaebe"
    // Plastic Case - "5c052cea86f7746b2101e8d8"
    // Dead Skav - "5909e4b686f7747f5b744fa4"
    // Rations Crate - "5d6fd13186f77424ad2a8c69"
    // Tech Crate - "5d6fd45b86f774317075ed43"
    // Weapon Box 1 - "5909d5ef86f77467974efbd8"
    // Weapon Box 2 - "5909d7cf86f77470ee57d75a"
    // Weapon Box 3 - "5909d76c86f77471e53d2adf"
    // Weapon Box 4 - "5909d89086f77472591234a0"
    // Ground Cache - "5d6d2b5486f774785c2ba8ea"
    // Cash Register - "578f879c24597735401e6bc6"
    // Med Crate - "5d6fe50986f77449d97f7463"
    // Duffle Bag - "578f87a3245977356274f2cb"
    // Fund Stash - "5d07b91b86f7745a077a9432"
    // Buried Cache - "5d6d2bb386f774785b07a77a"
    // Wood Ammo Box - "5909d45286f77465a8136dc6"
    // Cash Register 2 - "5ad74cf586f774391278f6f0"
    // Med Bag SMU - "5909d24f86f77466f56e6855"
    // Grenade Box - "5909d36d86f774660f0bb900"

    // Set Jacket Loot Change
    loot.staticLoot["578f8778245977358849a9b5"].itemcountDistribution[0].relativeProbability = loot.staticLoot["578f8778245977358849a9b5"].itemcountDistribution[0].relativeProbability * containerLootMultiplier;
    // Set File Cabinet Draw loot
    loot.staticLoot["578f87b7245977356274f2cd"].itemcountDistribution[0].relativeProbability = loot.staticLoot["578f87b7245977356274f2cd"].itemcountDistribution[0].relativeProbability * containerLootMultiplier;




    

    const ragfairConfig = globalValues.configServer.getConfig("aki-ragfair");
    ragfairConfig.dynamic.blacklist.enableBsgList = false;

    const itemConfig = globalValues.configServer.getConfig("aki-item");
    itemConfig.blacklist = [];
    globalValues.config.debug && globalValues.Logger.info(" ==> ModifyLoot Complete");

}