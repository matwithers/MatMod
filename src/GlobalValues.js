"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalValues = void 0;
const config_json_1 = __importDefault(require("../config.json"));
class globalValues {
    static Logger;
    static database;
    static config = config_json_1.default;
    static botGenerationCacheService;
    static configServer;
}
exports.globalValues = globalValues;
//# sourceMappingURL=GlobalValues.js.map