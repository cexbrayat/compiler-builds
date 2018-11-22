/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler/src/aot/partial_module" />
import * as o from '../output/output_ast';
export interface PartialModule {
    fileName: string;
    statements: o.Statement[];
}
