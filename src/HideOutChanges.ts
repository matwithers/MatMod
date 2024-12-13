import { DependencyContainer } from 'tsyringe';
import { globalValues } from "./GlobalValues";

export const HideOutFastConstruction = (container: DependencyContainer): undefined => {
    globalValues.config.debug && globalValues.Logger.info(" ==> HideOutFastConstruction Started");

    const hideout = globalValues.database.hideout;

    /////////////////////
    // Hideout Stuff Here
    /////////////////////
    // Change hideout fuel consumption - default: 0013194444444444
    hideout.settings.generatorFuelFlowRate = globalValues.config.HideOut.generatorFuelFlowRate;
    globalValues.config.debug && globalValues.Logger.info(` ==> HideOutFastConstruction generatorFuelFlowRate: ${globalValues.config.generatorFuelFlowRate}`);
    // Generator Speed without fuel - default: 0.07
    hideout.settings.generatorSpeedWithoutFuel = globalValues.config.HideOut.generatorSpeedWithoutFuel;
    globalValues.config.debug && globalValues.Logger.info(` ==> HideOutFastConstruction generatorSpeedWithoutFuel: ${globalValues.config.generatorSpeedWithoutFuel}`);
    // Air filter rate - default: 0.0047222222222222
    hideout.settings.airFilterUnitFlowRate = globalValues.config.HideOut.airFilterUnitFlowRate;
    globalValues.config.debug && globalValues.Logger.info(` ==> HideOutFastConstruction airFilterUnitFlowRate: ${globalValues.config.airFilterUnitFlowRate}`);
    // GPU boost rate - default: 0.041225
    hideout.settings.gpuBoostRate = globalValues.config.HideOut.gpuBoostRate;
    globalValues.config.debug && globalValues.Logger.info(` ==> HideOutFastConstruction gpuBoostRate: ${globalValues.config.gpuBoostRate}`);

    // Fast construction of hideout areas
    if (globalValues.config.HideOut.fastHideoutConstruction) {
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
    if (globalValues.config.HideOut.fastHideoutProduction) {
        for (const data in hideout.production) {
            let productionData = hideout.production[data];
            if (productionData.continuous === false && productionData.productionTime >= 10) {
                productionData.productionTime = 10;
            }
        }
    }
    globalValues.config.debug && globalValues.Logger.info(" ==> HideOutFastConstruction Complete");
}