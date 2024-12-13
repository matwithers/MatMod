"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HideOutFastConstruction = void 0;
const GlobalValues_1 = require("./GlobalValues");
const HideOutFastConstruction = (container) => {
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> HideOutFastConstruction Started");
    const hideout = GlobalValues_1.globalValues.database.hideout;
    /////////////////////
    // Hideout Stuff Here
    /////////////////////
    // Change hideout fuel consumption - default: 0013194444444444
    hideout.settings.generatorFuelFlowRate = GlobalValues_1.globalValues.config.HideOut.generatorFuelFlowRate;
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> HideOutFastConstruction generatorFuelFlowRate: ${GlobalValues_1.globalValues.config.generatorFuelFlowRate}`);
    // Generator Speed without fuel - default: 0.07
    hideout.settings.generatorSpeedWithoutFuel = GlobalValues_1.globalValues.config.HideOut.generatorSpeedWithoutFuel;
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> HideOutFastConstruction generatorSpeedWithoutFuel: ${GlobalValues_1.globalValues.config.generatorSpeedWithoutFuel}`);
    // Air filter rate - default: 0.0047222222222222
    hideout.settings.airFilterUnitFlowRate = GlobalValues_1.globalValues.config.HideOut.airFilterUnitFlowRate;
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> HideOutFastConstruction airFilterUnitFlowRate: ${GlobalValues_1.globalValues.config.airFilterUnitFlowRate}`);
    // GPU boost rate - default: 0.041225
    hideout.settings.gpuBoostRate = GlobalValues_1.globalValues.config.HideOut.gpuBoostRate;
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(` ==> HideOutFastConstruction gpuBoostRate: ${GlobalValues_1.globalValues.config.gpuBoostRate}`);
    // Fast construction of hideout areas
    if (GlobalValues_1.globalValues.config.HideOut.fastHideoutConstruction) {
        for (const data in hideout.areas) {
            let areaData = hideout.areas[data];
            for (const i in areaData.stages) {
                if (areaData.stages[i].constructionTime > 0) {
                    areaData.stages[i].constructionTime = 10;
                }
            }
        }
    }
    //Enable fast hideout production
    if (GlobalValues_1.globalValues.config.HideOut.fastHideoutProduction) {
        for (const data in hideout.production) {
            let productionData = hideout.production[data];
            if (productionData.continuous === false && productionData.productionTime >= 10) {
                productionData.productionTime = 10;
            }
        }
    }
    GlobalValues_1.globalValues.config.debug && GlobalValues_1.globalValues.Logger.info(" ==> HideOutFastConstruction Complete");
};
exports.HideOutFastConstruction = HideOutFastConstruction;
//# sourceMappingURL=HideOutChanges.js.map