import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    apiEndpoint: string;
}

export const AppConfig: IAppConfig = {    
    apiEndpoint: "https://localhost:44331/api/v1"    
};