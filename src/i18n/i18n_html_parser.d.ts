/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler/src/i18n/i18n_html_parser" />
import { MissingTranslationStrategy } from '../core';
import { HtmlParser } from '../ml_parser/html_parser';
import { InterpolationConfig } from '../ml_parser/interpolation_config';
import { ParseTreeResult } from '../ml_parser/parser';
import { Console } from '../util';
export declare class I18NHtmlParser implements HtmlParser {
    private _htmlParser;
    getTagDefinition: any;
    private _translationBundle;
    constructor(_htmlParser: HtmlParser, translations?: string, translationsFormat?: string, missingTranslation?: MissingTranslationStrategy, console?: Console);
    parse(source: string, url: string, parseExpansionForms?: boolean, interpolationConfig?: InterpolationConfig): ParseTreeResult;
}
