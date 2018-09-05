/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createNgModule } from './core';
import { findLast } from './directive_resolver';
import { stringify } from './util';
/**
 * Resolves types to {@link NgModule}.
 */
export class NgModuleResolver {
    constructor(_reflector) {
        this._reflector = _reflector;
    }
    isNgModule(type) { return this._reflector.annotations(type).some(createNgModule.isTypeOf); }
    resolve(type, throwIfNotFound = true) {
        const ngModuleMeta = findLast(this._reflector.annotations(type), createNgModule.isTypeOf);
        if (ngModuleMeta) {
            return ngModuleMeta;
        }
        else {
            if (throwIfNotFound) {
                throw new Error(`No NgModule metadata found for '${stringify(type)}'.`);
            }
            return null;
        }
    }
}
//# sourceMappingURL=ng_module_resolver.js.map