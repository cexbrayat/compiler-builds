/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler/src/ml_parser/parser" />
import { ParseError, ParseSourceSpan } from '../parse_util';
import * as html from './ast';
import { InterpolationConfig } from './interpolation_config';
import { TagDefinition } from './tags';
export declare class TreeError extends ParseError {
    elementName: string | null;
    static create(elementName: string | null, span: ParseSourceSpan, msg: string): TreeError;
    constructor(elementName: string | null, span: ParseSourceSpan, msg: string);
}
export declare class ParseTreeResult {
    rootNodes: html.Node[];
    errors: ParseError[];
    constructor(rootNodes: html.Node[], errors: ParseError[]);
}
export declare class Parser {
    getTagDefinition: (tagName: string) => TagDefinition;
    constructor(getTagDefinition: (tagName: string) => TagDefinition);
    parse(source: string, url: string, parseExpansionForms?: boolean, interpolationConfig?: InterpolationConfig): ParseTreeResult;
}
