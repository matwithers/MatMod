import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { BotGenerationCacheService } from "@spt-aki/services/BotGenerationCacheService"
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import config from "../config.json";

export class globalValues {
    public static Logger: ILogger;
    public static database: IDatabaseTables;
    public static config = config;
    public static botGenerationCacheService: BotGenerationCacheService;
    public static configServer: ConfigServer;
}