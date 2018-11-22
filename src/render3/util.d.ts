/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler/src/render3/util" />
import * as o from '../output/output_ast';
import { OutputContext } from '../util';
/**
 * Convert an object map with `Expression` values into a `LiteralMapExpr`.
 */
export declare function mapToMapExpression(map: {
    [key: string]: o.Expression;
}): o.LiteralMapExpr;
/**
 * Convert metadata into an `Expression` in the given `OutputContext`.
 *
 * This operation will handle arrays, references to symbols, or literal `null` or `undefined`.
 */
export declare function convertMetaToOutput(meta: any, ctx: OutputContext): o.Expression;
export declare function typeWithParameters(type: o.Expression, numParams: number): o.ExpressionType;
export interface R3Reference {
    value: o.Expression;
    type: o.Expression;
}
