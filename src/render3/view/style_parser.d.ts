/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler/src/render3/view/style_parser" />
/**
 * Parses string representation of a style and converts it into object literal.
 *
 * @param value string representation of style as used in the `style` attribute in HTML.
 *   Example: `color: red; height: auto`.
 * @returns an object literal. `{ color: 'red', height: 'auto'}`.
 */
export declare function parse(value: string): {
    [key: string]: any;
};
export declare function stripUnnecessaryQuotes(value: string): string;
export declare function hyphenate(value: string): string;
