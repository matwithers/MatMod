"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCoreAI = exports.DifficultyChanges = void 0;
const GlobalValues_1 = require("./GlobalValues");
const DifficultyChanges = () => {
    (0, exports.changeCoreAI)();
};
exports.DifficultyChanges = DifficultyChanges;
const changeCoreAI = () => {
    let core = GlobalValues_1.globalValues.database.bots.core;
    core.START_DIST_TO_COV = 5; // START_DISTANCE_TO_COV These were fixed? check bots for cover usage
    core.MAX_DIST_TO_COV = 50; // MAX_DISTANCE_TO_COV
    core.COVER_SECONDS_AFTER_LOSE_VISION = 2;
    core.WEAPON_ROOT_Y_OFFSET = 0;
    core.LAY_DOWN_ANG_SHOOT = 10;
    core.CAN_SHOOT_TO_HEAD = false; //Configure?
    //Is this better higher or lower? Can it get them to group up more? I hope so.
    //core.MIN_MAX_PERSON_SEARCH = 5
    core.MAIN_TACTIC_ONLY_ATTACK = false;
    core.LAST_SEEN_POS_LIFETIME = 60;
    core.FLARE_POWER = 8;
    core.FLARE_TIME = 1.5;
    core.WAVE_ONLY_AS_ONLINE = false;
    // In theory, a higher number *should* mean that they'll group with more of their buddies. ..Right? 
    // 300 is a super high default for that, though.
    // 300m is ~1.5 times the length of the construction site on Customs. Test this.
    // console.log(core.DIST_NOT_TO_GROUP)
    core.DIST_NOT_TO_GROUP = GlobalValues_1.globalValues.config.BotDifficulty.botGroupDistance;
    //Automatically square it, because math is hard.
    core.DIST_NOT_TO_GROUP_SQR = core.DIST_NOT_TO_GROUP * core.DIST_NOT_TO_GROUP;
};
exports.changeCoreAI = changeCoreAI;
//# sourceMappingURL=DifficultyChanges.js.map