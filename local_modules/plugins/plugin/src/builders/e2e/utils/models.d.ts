import { JsonObject } from '@angular-devkit/core';
export interface E2eBuilderOptions extends JsonObject {
    jestConfig: string;
}
export interface NormalizedOptions extends E2eBuilderOptions {
}
