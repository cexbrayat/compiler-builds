import * as tslib_1 from "tslib";
import * as o from '../../output/output_ast';
import { Identifiers as R3 } from '../r3_identifiers';
import { parse as parseStyle } from './style_parser';
/**
 * Produces creation/update instructions for all styling bindings (class and style)
 *
 * The builder class below handles producing instructions for the following cases:
 *
 * - Static style/class attributes (style="..." and class="...")
 * - Dynamic style/class map bindings ([style]="map" and [class]="map|string")
 * - Dynamic style/class property bindings ([style.prop]="exp" and [class.name]="exp")
 *
 * Due to the complex relationship of all of these cases, the instructions generated
 * for these attributes/properties/bindings must be done so in the correct order. The
 * order which these must be generated is as follows:
 *
 * if (createMode) {
 *   elementStyling(...)
 * }
 * if (updateMode) {
 *   elementStylingMap(...)
 *   elementStyleProp(...)
 *   elementClassProp(...)
 *   elementStylingApp(...)
 * }
 *
 * The creation/update methods within the builder class produce these instructions.
 */
var StylingBuilder = /** @class */ (function () {
    function StylingBuilder(_elementIndexExpr, _directiveIndexExpr) {
        this._elementIndexExpr = _elementIndexExpr;
        this._directiveIndexExpr = _directiveIndexExpr;
        this.hasBindingsOrInitialValues = false;
        this._classMapInput = null;
        this._styleMapInput = null;
        this._singleStyleInputs = null;
        this._singleClassInputs = null;
        this._lastStylingInput = null;
        // maps are used instead of hash maps because a Map will
        // retain the ordering of the keys
        this._stylesIndex = new Map();
        this._classesIndex = new Map();
        this._initialStyleValues = {};
        this._initialClassValues = {};
        this._useDefaultSanitizer = false;
        this._applyFnRequired = false;
    }
    StylingBuilder.prototype.registerBoundInput = function (input) {
        // [attr.style] or [attr.class] are skipped in the code below,
        // they should not be treated as styling-based bindings since
        // they are intended to be written directly to the attr and
        // will therefore skip all style/class resolution that is present
        // with style="", [style]="" and [style.prop]="", class="",
        // [class.prop]="". [class]="" assignments
        var name = input.name;
        var binding = null;
        switch (input.type) {
            case 0 /* Property */:
                if (name == 'style') {
                    binding = this.registerStyleInput(null, input.value, '', input.sourceSpan);
                }
                else if (isClassBinding(input.name)) {
                    binding = this.registerClassInput(null, input.value, input.sourceSpan);
                }
                break;
            case 3 /* Style */:
                binding = this.registerStyleInput(input.name, input.value, input.unit, input.sourceSpan);
                break;
            case 2 /* Class */:
                binding = this.registerClassInput(input.name, input.value, input.sourceSpan);
                break;
        }
        return binding ? true : false;
    };
    StylingBuilder.prototype.registerStyleInput = function (propertyName, value, unit, sourceSpan) {
        var entry = { name: propertyName, unit: unit, value: value, sourceSpan: sourceSpan };
        if (propertyName) {
            (this._singleStyleInputs = this._singleStyleInputs || []).push(entry);
            this._useDefaultSanitizer = this._useDefaultSanitizer || isStyleSanitizable(propertyName);
            registerIntoMap(this._stylesIndex, propertyName);
            this.hasBindingsOrInitialValues = true;
        }
        else {
            this._useDefaultSanitizer = true;
            this._styleMapInput = entry;
        }
        this._lastStylingInput = entry;
        this.hasBindingsOrInitialValues = true;
        this._applyFnRequired = true;
        return entry;
    };
    StylingBuilder.prototype.registerClassInput = function (className, value, sourceSpan) {
        var entry = { name: className, value: value, sourceSpan: sourceSpan };
        if (className) {
            (this._singleClassInputs = this._singleClassInputs || []).push(entry);
            this.hasBindingsOrInitialValues = true;
            registerIntoMap(this._classesIndex, className);
        }
        else {
            this._classMapInput = entry;
        }
        this._lastStylingInput = entry;
        this.hasBindingsOrInitialValues = true;
        this._applyFnRequired = true;
        return entry;
    };
    StylingBuilder.prototype.registerStyleAttr = function (value) {
        var _this = this;
        this._initialStyleValues = parseStyle(value);
        Object.keys(this._initialStyleValues).forEach(function (prop) {
            registerIntoMap(_this._stylesIndex, prop);
            _this.hasBindingsOrInitialValues = true;
        });
    };
    StylingBuilder.prototype.registerClassAttr = function (value) {
        var _this = this;
        this._initialClassValues = {};
        value.split(/\s+/g).forEach(function (className) {
            _this._initialClassValues[className] = true;
            registerIntoMap(_this._classesIndex, className);
            _this.hasBindingsOrInitialValues = true;
        });
    };
    StylingBuilder.prototype._buildInitExpr = function (registry, initialValues) {
        var exprs = [];
        var nameAndValueExprs = [];
        // _c0 = [prop, prop2, prop3, ...]
        registry.forEach(function (value, key) {
            var keyLiteral = o.literal(key);
            exprs.push(keyLiteral);
            var initialValue = initialValues[key];
            if (initialValue) {
                nameAndValueExprs.push(keyLiteral, o.literal(initialValue));
            }
        });
        if (nameAndValueExprs.length) {
            // _c0 = [... MARKER ...]
            exprs.push(o.literal(1 /* VALUES_MODE */));
            // _c0 = [prop, VALUE, prop2, VALUE2, ...]
            exprs.push.apply(exprs, tslib_1.__spread(nameAndValueExprs));
        }
        return exprs.length ? o.literalArr(exprs) : null;
    };
    StylingBuilder.prototype.buildCreateLevelInstruction = function (sourceSpan, constantPool) {
        if (this.hasBindingsOrInitialValues) {
            var initialClasses = this._buildInitExpr(this._classesIndex, this._initialClassValues);
            var initialStyles = this._buildInitExpr(this._stylesIndex, this._initialStyleValues);
            // in the event that a [style] binding is used then sanitization will
            // always be imported because it is not possible to know ahead of time
            // whether style bindings will use or not use any sanitizable properties
            // that isStyleSanitizable() will detect
            var useSanitizer = this._useDefaultSanitizer;
            var params_1 = [];
            if (initialClasses) {
                // the template compiler handles initial class styling (e.g. class="foo") values
                // in a special command called `elementClass` so that the initial class
                // can be processed during runtime. These initial class values are bound to
                // a constant because the inital class values do not change (since they're static).
                params_1.push(constantPool.getConstLiteral(initialClasses, true));
            }
            else if (initialStyles || useSanitizer) {
                // no point in having an extra `null` value unless there are follow-up params
                params_1.push(o.NULL_EXPR);
            }
            if (initialStyles) {
                // the template compiler handles initial style (e.g. style="foo") values
                // in a special command called `elementStyle` so that the initial styles
                // can be processed during runtime. These initial styles values are bound to
                // a constant because the inital style values do not change (since they're static).
                params_1.push(constantPool.getConstLiteral(initialStyles, true));
            }
            else if (useSanitizer || this._directiveIndexExpr) {
                // no point in having an extra `null` value unless there are follow-up params
                params_1.push(o.NULL_EXPR);
            }
            if (useSanitizer || this._directiveIndexExpr) {
                params_1.push(useSanitizer ? o.importExpr(R3.defaultStyleSanitizer) : o.NULL_EXPR);
                if (this._directiveIndexExpr) {
                    params_1.push(this._directiveIndexExpr);
                }
            }
            return { sourceSpan: sourceSpan, reference: R3.elementStyling, buildParams: function () { return params_1; } };
        }
        return null;
    };
    StylingBuilder.prototype._buildStylingMap = function (valueConverter) {
        var _this = this;
        if (this._classMapInput || this._styleMapInput) {
            var stylingInput = this._classMapInput || this._styleMapInput;
            // these values must be outside of the update block so that they can
            // be evaluted (the AST visit call) during creation time so that any
            // pipes can be picked up in time before the template is built
            var mapBasedClassValue_1 = this._classMapInput ? this._classMapInput.value.visit(valueConverter) : null;
            var mapBasedStyleValue_1 = this._styleMapInput ? this._styleMapInput.value.visit(valueConverter) : null;
            return {
                sourceSpan: stylingInput.sourceSpan,
                reference: R3.elementStylingMap,
                buildParams: function (convertFn) {
                    var params = [_this._elementIndexExpr];
                    if (mapBasedClassValue_1) {
                        params.push(convertFn(mapBasedClassValue_1));
                    }
                    else if (_this._styleMapInput) {
                        params.push(o.NULL_EXPR);
                    }
                    if (mapBasedStyleValue_1) {
                        params.push(convertFn(mapBasedStyleValue_1));
                    }
                    else if (_this._directiveIndexExpr) {
                        params.push(o.NULL_EXPR);
                    }
                    if (_this._directiveIndexExpr) {
                        params.push(_this._directiveIndexExpr);
                    }
                    return params;
                }
            };
        }
        return null;
    };
    StylingBuilder.prototype._buildSingleInputs = function (reference, inputs, mapIndex, allowUnits, valueConverter) {
        var _this = this;
        return inputs.map(function (input) {
            var bindingIndex = mapIndex.get(input.name);
            var value = input.value.visit(valueConverter);
            return {
                sourceSpan: input.sourceSpan,
                reference: reference,
                buildParams: function (convertFn) {
                    var params = [_this._elementIndexExpr, o.literal(bindingIndex), convertFn(value)];
                    if (allowUnits) {
                        if (input.unit) {
                            params.push(o.literal(input.unit));
                        }
                        else if (_this._directiveIndexExpr) {
                            params.push(o.NULL_EXPR);
                        }
                    }
                    if (_this._directiveIndexExpr) {
                        params.push(_this._directiveIndexExpr);
                    }
                    return params;
                }
            };
        });
    };
    StylingBuilder.prototype._buildClassInputs = function (valueConverter) {
        if (this._singleClassInputs) {
            return this._buildSingleInputs(R3.elementClassProp, this._singleClassInputs, this._classesIndex, false, valueConverter);
        }
        return [];
    };
    StylingBuilder.prototype._buildStyleInputs = function (valueConverter) {
        if (this._singleStyleInputs) {
            return this._buildSingleInputs(R3.elementStyleProp, this._singleStyleInputs, this._stylesIndex, true, valueConverter);
        }
        return [];
    };
    StylingBuilder.prototype._buildApplyFn = function () {
        var _this = this;
        return {
            sourceSpan: this._lastStylingInput ? this._lastStylingInput.sourceSpan : null,
            reference: R3.elementStylingApply,
            buildParams: function () {
                var params = [_this._elementIndexExpr];
                if (_this._directiveIndexExpr) {
                    params.push(_this._directiveIndexExpr);
                }
                return params;
            }
        };
    };
    StylingBuilder.prototype.buildUpdateLevelInstructions = function (valueConverter) {
        var instructions = [];
        if (this.hasBindingsOrInitialValues) {
            var mapInstruction = this._buildStylingMap(valueConverter);
            if (mapInstruction) {
                instructions.push(mapInstruction);
            }
            instructions.push.apply(instructions, tslib_1.__spread(this._buildStyleInputs(valueConverter)));
            instructions.push.apply(instructions, tslib_1.__spread(this._buildClassInputs(valueConverter)));
            if (this._applyFnRequired) {
                instructions.push(this._buildApplyFn());
            }
        }
        return instructions;
    };
    return StylingBuilder;
}());
export { StylingBuilder };
function isClassBinding(name) {
    return name == 'className' || name == 'class';
}
function registerIntoMap(map, key) {
    if (!map.has(key)) {
        map.set(key, map.size);
    }
}
function isStyleSanitizable(prop) {
    return prop === 'background-image' || prop === 'background' || prop === 'border-image' ||
        prop === 'filter' || prop === 'list-style' || prop === 'list-style-image';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3ZpZXcvc3R5bGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBVUEsT0FBTyxLQUFLLENBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUc3QyxPQUFPLEVBQUMsV0FBVyxJQUFJLEVBQUUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBQyxLQUFLLElBQUksVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUF3Qm5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSDtJQWtCRSx3QkFDWSxpQkFBK0IsRUFBVSxtQkFBc0M7UUFBL0Usc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFjO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQWxCM0UsK0JBQTBCLEdBQUcsS0FBSyxDQUFDO1FBRTNDLG1CQUFjLEdBQTJCLElBQUksQ0FBQztRQUM5QyxtQkFBYyxHQUEyQixJQUFJLENBQUM7UUFDOUMsdUJBQWtCLEdBQTZCLElBQUksQ0FBQztRQUNwRCx1QkFBa0IsR0FBNkIsSUFBSSxDQUFDO1FBQ3BELHNCQUFpQixHQUEyQixJQUFJLENBQUM7UUFFekQsd0RBQXdEO1FBQ3hELGtDQUFrQztRQUMxQixpQkFBWSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ3pDLGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDMUMsd0JBQW1CLEdBQWlDLEVBQUUsQ0FBQztRQUN2RCx3QkFBbUIsR0FBbUMsRUFBRSxDQUFDO1FBQ3pELHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFHNkQsQ0FBQztJQUUvRiwyQ0FBa0IsR0FBbEIsVUFBbUIsS0FBdUI7UUFDeEMsOERBQThEO1FBQzlELDZEQUE2RDtR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RCxTQUFTLGVBQWUsQ0FBQyxHQUF3QixFQUFFLEdBQVc7SUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDakIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsSUFBWTtJQUN0QyxPQUFPLElBQUksS0FBSyxrQkFBa0IsSUFBSSxJQUFJLEtBQUssWUFBWSxJQUFJLElBQUksS0FBSyxjQUFjO1FBQ2xGLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxJQUFJLEtBQUssa0JBQWtCLENBQUM7QUFDaEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Q29uc3RhbnRQb29sfSBmcm9tICcuLi8uLi9jb25zdGFudF9wb29sJztcbmltcG9ydCB7SW5pdGlhbFN0eWxpbmdGbGFnc30gZnJvbSAnLi4vLi4vY29yZSc7XG5pbXBvcnQge0FTVCwgQmluZGluZ1R5cGUsIFBhcnNlU3Bhbn0gZnJvbSAnLi4vLi4vZXhwcmVzc2lvbl9wYXJzZXIvYXN0JztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uLy4uL3BhcnNlX3V0aWwnO1xuaW1wb3J0ICogYXMgdCBmcm9tICcuLi9yM19hc3QnO1xuaW1wb3J0IHtJZGVudGlmaWVycyBhcyBSM30gZnJvbSAnLi4vcjNfaWRlbnRpZmllcnMnO1xuXG5pbXBvcnQge3BhcnNlIGFzIHBhcnNlU3R5bGV9IGZyb20gJy4vc3R5bGVfcGFyc2VyJztcbmltcG9ydCB7VmFsdWVDb252ZXJ0ZXJ9IGZyb20gJy4vdGVtcGxhdGUnO1xuXG5cbi8qKlxuICogQSBzdHlsaW5nIGV4cHJlc3Npb24gc3VtbWFyeSB0aGF0IGlzIHRvIGJlIHByb2Nlc3NlZCBieSB0aGUgY29tcGlsZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdHlsaW5nSW5zdHJ1Y3Rpb24ge1xuICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW58bnVsbDtcbiAgcmVmZXJlbmNlOiBvLkV4dGVybmFsUmVmZXJlbmNlO1xuICBidWlsZFBhcmFtcyhjb252ZXJ0Rm46ICh2YWx1ZTogYW55KSA9PiBvLkV4cHJlc3Npb24pOiBvLkV4cHJlc3Npb25bXTtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcm5hbCByZWNvcmQgb2YgdGhlIGlucHV0IGRhdGEgZm9yIGEgc3R5bGluZyBiaW5kaW5nXG4gKi9cbmludGVyZmFjZSBCb3VuZFN0eWxpbmdFbnRyeSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdW5pdDogc3RyaW5nfG51bGw7XG4gIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbjtcbiAgdmFsdWU6IEFTVDtcbn1cblxuXG4vKipcbiAqIFByb2R1Y2VzIGNyZWF0aW9uL3VwZGF0ZSBpbnN0cnVjdGlvbnMgZm9yIGFsbCBzdHlsaW5nIGJpbmRpbmdzIChjbGFzcyBhbmQgc3R5bGUpXG4gKlxuICogVGhlIGJ1aWxkZXIgY2xhc3MgYmVsb3cgaGFuZGxlcyBwcm9kdWNpbmcgaW5zdHJ1Y3Rpb25zIGZvciB0aGUgZm9sbG93aW5nIGNhc2VzOlxuICpcbiAqIC0gU3RhdGljIHN0eWxlL2NsYXNzIGF0dHJpYnV0ZXMgKHN0eWxlPVwiLi4uXCIgYW5kIGNsYXNzPVwiLi4uXCIpXG4gKiAtIER5bmFtaWMgc3R5bGUvY2xhc3MgbWFwIGJpbmRpbmdzIChbc3R5bGVdPVwibWFwXCIgYW5kIFtjbGFzc109XCJtYXB8c3RyaW5nXCIpXG4gKiAtIER5bmFtaWMgc3R5bGUvY2xhc3MgcHJvcGVydHkgYmluZGluZ3MgKFtzdHlsZS5wcm9wXT1cImV4cFwiIGFuZCBbY2xhc3MubmFtZV09XCJleHBcIilcbiAqXG4gKiBEdWUgdG8gdGhlIGNvbXBsZXggcmVsYXRpb25zaGlwIG9mIGFsbCBvZiB0aGVzZSBjYXNlcywgdGhlIGluc3RydWN0aW9ucyBnZW5lcmF0ZWRcbiAqIGZvciB0aGVzZSBhdHRyaWJ1dGVzL3Byb3BlcnRpZXMvYmluZGluZ3MgbXVzdCBiZSBkb25lIHNvIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBUaGVcbiAqIG9yZGVyIHdoaWNoIHRoZXNlIG11c3QgYmUgZ2VuZXJhdGVkIGlzIGFzIGZvbGxvd3M6XG4gKlxuICogaWYgKGNyZWF0ZU1vZGUpIHtcbiAqICAgZWxlbWVudFN0eWxpbmcoLi4uKVxuICogfVxuICogaWYgKHVwZGF0ZU1vZGUpIHtcbiAqICAgZWxlbWVudFN0eWxpbmdNYXAoLi4uKVxuICogICBlbGVtZW50U3R5bGVQcm9wKC4uLilcbiAqICAgZWxlbWVudENsYXNzUHJvcCguLi4pXG4gKiAgIGVsZW1lbnRTdHlsaW5nQXBwKC4uLilcbiAqIH1cbiAqXG4gKiBUaGUgY3JlYXRpb24vdXBkYXRlIG1ldGhvZHMgd2l0aGluIHRoZSBidWlsZGVyIGNsYXNzIHByb2R1Y2UgdGhlc2UgaW5zdHJ1Y3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgU3R5bGluZ0J1aWxkZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgaGFzQmluZGluZ3NPckluaXRpYWxWYWx1ZXMgPSBmYWxzZTtcblxuICBwcml2YXRlIF9jbGFzc01hcElucHV0OiBCb3VuZFN0eWxpbmdFbnRyeXxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfc3R5bGVNYXBJbnB1dDogQm91bmRTdHlsaW5nRW50cnl8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3NpbmdsZVN0eWxlSW5wdXRzOiBCb3VuZFN0eWxpbmdFbnRyeVtdfG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9zaW5nbGVDbGFzc0lucHV0czogQm91bmRTdHlsaW5nRW50cnlbXXxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfbGFzdFN0eWxpbmdJbnB1dDogQm91bmRTdHlsaW5nRW50cnl8bnVsbCA9IG51bGw7XG5cbiAgLy8gbWFwcyBhcmUgdXNlZCBpbnN0ZWFkIG9mIGhhc2ggbWFwcyBiZWNhdXNlIGEgTWFwIHdpbGxcbiAgLy8gcmV0YWluIHRoZSBvcmRlcmluZyBvZiB0aGUga2V5c1xuICBwcml2YXRlIF9zdHlsZXNJbmRleCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIHByaXZhdGUgX2NsYXNzZXNJbmRleCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIHByaXZhdGUgX2luaXRpYWxTdHlsZVZhbHVlczoge1twcm9wTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBwcml2YXRlIF9pbml0aWFsQ2xhc3NWYWx1ZXM6IHtbY2xhc3NOYW1lOiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuICBwcml2YXRlIF91c2VEZWZhdWx0U2FuaXRpemVyID0gZmFsc2U7XG4gIHByaXZhdGUgX2FwcGx5Rm5SZXF1aXJlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudEluZGV4RXhwcjogby5FeHByZXNzaW9uLCBwcml2YXRlIF9kaXJlY3RpdmVJbmRleEV4cHI6IG8uRXhwcmVzc2lvbnxudWxsKSB7fVxuXG4gIHJlZ2lzdGVyQm91bmRJbnB1dChpbnB1dDogdC5Cb3VuZEF0dHJpYnV0ZSk6IGJvb2xlYW4ge1xuICAgIC8vIFthdHRyLnN0eWxlXSBvciBbYXR0ci5jbGFzc10gYXJlIHNraXBwZWQgaW4gdGhlIGNvZGUgYmVsb3csXG4gICAgLy8gdGhleSBzaG91bGQgbm90IGJlIHRyZWF0ZWQgYXMgc3R5bGluZy1iYXNlZCBiaW5kaW5ncyBzaW5jZVxuICAgIC8vIHRoZXkgYXJlIGludGVuZGVkIHRvIGJlIHdyaXR0ZW4gZGlyZWN0bHkgdG8gdGhlIGF0dHIgYW5kXG4gICAgLy8gd2lsbCB0aGVyZWZvcmUgc2tpcCBhbGwgc3R5bGUvY2xhc3MgcmVzb2x1dGlvbiB0aGF0IGlzIHByZXNlbnRcbiAgICAvLyB3aXRoIHN0eWxlPVwiXCIsIFtzdHlsZV09XCJcIiBhbmQgW3N0eWxlLnByb3BdPVwiXCIsIGNsYXNzPVwiXCIsXG4gICAgLy8gW2NsYXNzLnByb3BdPVwiXCIuIFtjbGFzc109XCJcIiBhc3NpZ25tZW50c1xuICAgIGNvbnN0IG5hbWUgPSBpbnB1dC5uYW1lO1xuICAgIGxldCBiaW5kaW5nOiBCb3VuZFN0eWxpbmdFbnRyeXxudWxsID0gbnVsbDtcbiAgICBzd2l0Y2ggKGlucHV0LnR5cGUpIHtcbiAgICAgIGNhc2UgQmluZGluZ1R5cGUuUHJvcGVydHk6XG4gICAgICAgIGlmIChuYW1lID09ICdzdHlsZScpIHtcbiAgICAgICAgICBiaW5kaW5nID0gdGhpcy5yZWdpc3RlclN0eWxlSW5wdXQobnVsbCwgaW5wdXQudmFsdWUsICcnLCBpbnB1dC5zb3VyY2VTcGFuKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0NsYXNzQmluZGluZyhpbnB1dC5uYW1lKSkge1xuICAgICAgICAgIGJpbmRpbmcgPSB0aGlzLnJlZ2lzdGVyQ2xhc3NJbnB1dChudWxsLCBpbnB1dC52YWx1ZSwgaW5wdXQuc291cmNlU3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEJpbmRpbmdUeXBlLlN0eWxlOlxuICAgICAgICBiaW5kaW5nID0gdGhpcy5yZWdpc3RlclN0eWxlSW5wdXQoaW5wdXQubmFtZSwgaW5wdXQudmFsdWUsIGlucHV0LnVuaXQsIGlucHV0LnNvdXJjZVNwYW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQmluZGluZ1R5cGUuQ2xhc3M6XG4gICAgICAgIGJpbmRpbmcgPSB0aGlzLnJlZ2lzdGVyQ2xhc3NJbnB1dChpbnB1dC5uYW1lLCBpbnB1dC52YWx1ZSwgaW5wdXQuc291cmNlU3Bhbik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gYmluZGluZyA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHJlZ2lzdGVyU3R5bGVJbnB1dChcbiAgICAgIHByb3BlcnR5TmFtZTogc3RyaW5nfG51bGwsIHZhbHVlOiBBU1QsIHVuaXQ6IHN0cmluZ3xudWxsLFxuICAgICAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKTogQm91bmRTdHlsaW5nRW50cnkge1xuICAgIGNvbnN0IGVudHJ5ID0geyBuYW1lOiBwcm9wZXJ0eU5hbWUsIHVuaXQsIHZhbHVlLCBzb3VyY2VTcGFuIH0gYXMgQm91bmRTdHlsaW5nRW50cnk7XG4gICAgaWYgKHByb3BlcnR5TmFtZSkge1xuICAgICAgKHRoaXMuX3NpbmdsZVN0eWxlSW5wdXRzID0gdGhpcy5fc2luZ2xlU3R5bGVJbnB1dHMgfHwgW10pLnB1c2goZW50cnkpO1xuICAgICAgdGhpcy5fdXNlRGVmYXVsdFNhbml0aXplciA9IHRoaXMuX3VzZURlZmF1bHRTYW5pdGl6ZXIgfHwgaXNTdHlsZVNhbml0aXphYmxlKHByb3BlcnR5TmFtZSk7XG4gICAgICByZWdpc3RlckludG9NYXAodGhpcy5fc3R5bGVzSW5kZXgsIHByb3BlcnR5TmFtZSk7XG4gICAgICAodGhpcyBhcyBhbnkpLmhhc0JpbmRpbmdzT3JJbml0aWFsVmFsdWVzID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdXNlRGVmYXVsdFNhbml0aXplciA9IHRydWU7XG4gICAgICB0aGlzLl9zdHlsZU1hcElucHV0ID0gZW50cnk7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RTdHlsaW5nSW5wdXQgPSBlbnRyeTtcbiAgICAodGhpcyBhcyBhbnkpLmhhc0JpbmRpbmdzT3JJbml0aWFsVmFsdWVzID0gdHJ1ZTtcbiAgICB0aGlzLl9hcHBseUZuUmVxdWlyZWQgPSB0cnVlO1xuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIHJlZ2lzdGVyQ2xhc3NJbnB1dChjbGFzc05hbWU6IHN0cmluZ3xudWxsLCB2YWx1ZTogQVNULCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOlxuICAgICAgQm91bmRTdHlsaW5nRW50cnkge1xuICAgIGNvbnN0IGVudHJ5ID0geyBuYW1lOiBjbGFzc05hbWUsIHZhbHVlLCBzb3VyY2VTcGFuIH0gYXMgQm91bmRTdHlsaW5nRW50cnk7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgKHRoaXMuX3NpbmdsZUNsYXNzSW5wdXRzID0gdGhpcy5fc2luZ2xlQ2xhc3NJbnB1dHMgfHwgW10pLnB1c2goZW50cnkpO1xuICAgICAgKHRoaXMgYXMgYW55KS5oYXNCaW5kaW5nc09ySW5pdGlhbFZhbHVlcyA9IHRydWU7XG4gICAgICByZWdpc3RlckludG9NYXAodGhpcy5fY2xhc3Nlc0luZGV4LCBjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jbGFzc01hcElucHV0ID0gZW50cnk7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RTdHlsaW5nSW5wdXQgPSBlbnRyeTtcbiAgICAodGhpcyBhcyBhbnkpLmhhc0JpbmRpbmdzT3JJbml0aWFsVmFsdWVzID0gdHJ1ZTtcbiAgICB0aGlzLl9hcHBseUZuUmVxdWlyZWQgPSB0cnVlO1xuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIHJlZ2lzdGVyU3R5bGVBdHRyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbml0aWFsU3R5bGVWYWx1ZXMgPSBwYXJzZVN0eWxlKHZhbHVlKTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9pbml0aWFsU3R5bGVWYWx1ZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICByZWdpc3RlckludG9NYXAodGhpcy5fc3R5bGVzSW5kZXgsIHByb3ApO1xuICAgICAgKHRoaXMgYXMgYW55KS5oYXNCaW5kaW5nc09ySW5pdGlhbFZhbHVlcyA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICByZWdpc3RlckNsYXNzQXR0cih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faW5pdGlhbENsYXNzVmFsdWVzID0ge307XG4gICAgdmFsdWUuc3BsaXQoL1xccysvZykuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgdGhpcy5faW5pdGlhbENsYXNzVmFsdWVzW2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgICAgcmVnaXN0ZXJJbnRvTWFwKHRoaXMuX2NsYXNzZXNJbmRleCwgY2xhc3NOYW1lKTtcbiAgICAgICh0aGlzIGFzIGFueSkuaGFzQmluZGluZ3NPckluaXRpYWxWYWx1ZXMgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbml0RXhwcihyZWdpc3RyeTogTWFwPHN0cmluZywgbnVtYmVyPiwgaW5pdGlhbFZhbHVlczoge1trZXk6IHN0cmluZ106IGFueX0pOlxuICAgICAgby5FeHByZXNzaW9ufG51bGwge1xuICAgIGNvbnN0IGV4cHJzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuICAgIGNvbnN0IG5hbWVBbmRWYWx1ZUV4cHJzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuXG4gICAgLy8gX2MwID0gW3Byb3AsIHByb3AyLCBwcm9wMywgLi4uXVxuICAgIHJlZ2lzdHJ5LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGtleUxpdGVyYWwgPSBvLmxpdGVyYWwoa2V5KTtcbiAgICAgIGV4cHJzLnB1c2goa2V5TGl0ZXJhbCk7XG4gICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWVzW2tleV07XG4gICAgICBpZiAoaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIG5hbWVBbmRWYWx1ZUV4cHJzLnB1c2goa2V5TGl0ZXJhbCwgby5saXRlcmFsKGluaXRpYWxWYWx1ZSkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5hbWVBbmRWYWx1ZUV4cHJzLmxlbmd0aCkge1xuICAgICAgLy8gX2MwID0gWy4uLiBNQVJLRVIgLi4uXVxuICAgICAgZXhwcnMucHVzaChvLmxpdGVyYWwoSW5pdGlhbFN0eWxpbmdGbGFncy5WQUxVRVNfTU9ERSkpO1xuICAgICAgLy8gX2MwID0gW3Byb3AsIFZBTFVFLCBwcm9wMiwgVkFMVUUyLCAuLi5dXG4gICAgICBleHBycy5wdXNoKC4uLm5hbWVBbmRWYWx1ZUV4cHJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwcnMubGVuZ3RoID8gby5saXRlcmFsQXJyKGV4cHJzKSA6IG51bGw7XG4gIH1cblxuICBidWlsZENyZWF0ZUxldmVsSW5zdHJ1Y3Rpb24oc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFufG51bGwsIGNvbnN0YW50UG9vbDogQ29uc3RhbnRQb29sKTpcbiAgICAgIFN0eWxpbmdJbnN0cnVjdGlvbnxudWxsIHtcbiAgICBpZiAodGhpcy5oYXNCaW5kaW5nc09ySW5pdGlhbFZhbHVlcykge1xuICAgICAgY29uc3QgaW5pdGlhbENsYXNzZXMgPSB0aGlzLl9idWlsZEluaXRFeHByKHRoaXMuX2NsYXNzZXNJbmRleCwgdGhpcy5faW5pdGlhbENsYXNzVmFsdWVzKTtcbiAgICAgIGNvbnN0IGluaXRpYWxTdHlsZXMgPSB0aGlzLl9idWlsZEluaXRFeHByKHRoaXMuX3N0eWxlc0luZGV4LCB0aGlzLl9pbml0aWFsU3R5bGVWYWx1ZXMpO1xuXG4gICAgICAvLyBpbiB0aGUgZXZlbnQgdGhhdCBhIFtzdHlsZV0gYmluZGluZyBpcyB1c2VkIHRoZW4gc2FuaXRpemF0aW9uIHdpbGxcbiAgICAgIC8vIGFsd2F5cyBiZSBpbXBvcnRlZCBiZWNhdXNlIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBrbm93IGFoZWFkIG9mIHRpbWVcbiAgICAgIC8vIHdoZXRoZXIgc3R5bGUgYmluZGluZ3Mgd2lsbCB1c2Ugb3Igbm90IHVzZSBhbnkgc2FuaXRpemFibGUgcHJvcGVydGllc1xuICAgICAgLy8gdGhhdCBpc1N0eWxlU2FuaXRpemFibGUoKSB3aWxsIGRldGVjdFxuICAgICAgY29uc3QgdXNlU2FuaXRpemVyID0gdGhpcy5fdXNlRGVmYXVsdFNhbml0aXplcjtcbiAgICAgIGNvbnN0IHBhcmFtczogKG8uRXhwcmVzc2lvbilbXSA9IFtdO1xuXG4gICAgICBpZiAoaW5pdGlhbENsYXNzZXMpIHtcbiAgICAgICAgLy8gdGhlIHRlbXBsYXRlIGNvbXBpbGVyIGhhbmRsZXMgaW5pdGlhbCBjbGFzcyBzdHlsaW5nIChlLmcuIGNsYXNzPVwiZm9vXCIpIHZhbHVlc1xuICAgICAgICAvLyBpbiBhIHNwZWNpYWwgY29tbWFuZCBjYWxsZWQgYGVsZW1lbnRDbGFzc2Agc28gdGhhdCB0aGUgaW5pdGlhbCBjbGFzc1xuICAgICAgICAvLyBjYW4gYmUgcHJvY2Vzc2VkIGR1cmluZyBydW50aW1lLiBUaGVzZSBpbml0aWFsIGNsYXNzIHZhbHVlcyBhcmUgYm91bmQgdG9cbiAgICAgICAgLy8gYSBjb25zdGFudCBiZWNhdXNlIHRoZSBpbml0YWwgY2xhc3MgdmFsdWVzIGRvIG5vdCBjaGFuZ2UgKHNpbmNlIHRoZXkncmUgc3RhdGljKS5cbiAgICAgICAgcGFyYW1zLnB1c2goY29uc3RhbnRQb29sLmdldENvbnN0TGl0ZXJhbChpbml0aWFsQ2xhc3NlcywgdHJ1ZSkpO1xuICAgICAgfSBlbHNlIGlmIChpbml0aWFsU3R5bGVzIHx8IHVzZVNhbml0aXplcikge1xuICAgICAgICAvLyBubyBwb2ludCBpbiBoYXZpbmcgYW4gZXh0cmEgYG51bGxgIHZhbHVlIHVubGVzcyB0aGVyZSBhcmUgZm9sbG93LXVwIHBhcmFtc1xuICAgICAgICBwYXJhbXMucHVzaChvLk5VTExfRVhQUik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbml0aWFsU3R5bGVzKSB7XG4gICAgICAgIC8vIHRoZSB0ZW1wbGF0ZSBjb21waWxlciBoYW5kbGVzIGluaXRpYWwgc3R5bGUgKGUuZy4gc3R5bGU9XCJmb29cIikgdmFsdWVzXG4gICAgICAgIC8vIGluIGEgc3BlY2lhbCBjb21tYW5kIGNhbGxlZCBgZWxlbWVudFN0eWxlYCBzbyB0aGF0IHRoZSBpbml0aWFsIHN0eWxlc1xuICAgICAgICAvLyBjYW4gYmUgcHJvY2Vzc2VkIGR1cmluZyBydW50aW1lLiBUaGVzZSBpbml0aWFsIHN0eWxlcyB2YWx1ZXMgYXJlIGJvdW5kIHRvXG4gICAgICAgIC8vIGEgY29uc3RhbnQgYmVjYXVzZSB0aGUgaW5pdGFsIHN0eWxlIHZhbHVlcyBkbyBub3QgY2hhbmdlIChzaW5jZSB0aGV5J3JlIHN0YXRpYykuXG4gICAgICAgIHBhcmFtcy5wdXNoKGNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwoaW5pdGlhbFN0eWxlcywgdHJ1ZSkpO1xuICAgICAgfSBlbHNlIGlmICh1c2VTYW5pdGl6ZXIgfHwgdGhpcy5fZGlyZWN0aXZlSW5kZXhFeHByKSB7XG4gICAgICAgIC8vIG5vIHBvaW50IGluIGhhdmluZyBhbiBleHRyYSBgbnVsbGAgdmFsdWUgdW5sZXNzIHRoZXJlIGFyZSBmb2xsb3ctdXAgcGFyYW1zXG4gICAgICAgIHBhcmFtcy5wdXNoKG8uTlVMTF9FWFBSKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHVzZVNhbml0aXplciB8fCB0aGlzLl9kaXJlY3RpdmVJbmRleEV4cHIpIHtcbiAgICAgICAgcGFyYW1zLnB1c2godXNlU2FuaXRpemVyID8gby5pbXBvcnRFeHByKFIzLmRlZmF1bHRTdHlsZVNhbml0aXplcikgOiBvLk5VTExfRVhQUik7XG4gICAgICAgIGlmICh0aGlzLl9kaXJlY3RpdmVJbmRleEV4cHIpIHtcbiAgICAgICAgICBwYXJhbXMucHVzaCh0aGlzLl9kaXJlY3RpdmVJbmRleEV4cHIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7c291cmNlU3BhbiwgcmVmZXJlbmNlOiBSMy5lbGVtZW50U3R5bGluZywgYnVpbGRQYXJhbXM6ICgpID0+IHBhcmFtc307XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRTdHlsaW5nTWFwKHZhbHVlQ29udmVydGVyOiBWYWx1ZUNvbnZlcnRlcik6IFN0eWxpbmdJbnN0cnVjdGlvbnxudWxsIHtcbiAgICBpZiAodGhpcy5fY2xhc3NNYXBJbnB1dCB8fCB0aGlzLl9zdHlsZU1hcElucHV0KSB7XG4gICAgICBjb25zdCBzdHlsaW5nSW5wdXQgPSB0aGlzLl9jbGFzc01hcElucHV0ICEgfHwgdGhpcy5fc3R5bGVNYXBJbnB1dCAhO1xuXG4gICAgICAvLyB0aGVzZSB2YWx1ZXMgbXVzdCBiZSBvdXRzaWRlIG9mIHRoZSB1cGRhdGUgYmxvY2sgc28gdGhhdCB0aGV5IGNhblxuICAgICAgLy8gYmUgZXZhbHV0ZWQgKHRoZSBBU1QgdmlzaXQgY2FsbCkgZHVyaW5nIGNyZWF0aW9uIHRpbWUgc28gdGhhdCBhbnlcbiAgICAgIC8vIHBpcGVzIGNhbiBiZSBwaWNrZWQgdXAgaW4gdGltZSBiZWZvcmUgdGhlIHRlbXBsYXRlIGlzIGJ1aWx0XG4gICAgICBjb25zdCBtYXBCYXNlZENsYXNzVmFsdWUgPVxuICAgICAgICAgIHRoaXMuX2NsYXNzTWFwSW5wdXQgPyB0aGlzLl9jbGFzc01hcElucHV0LnZhbHVlLnZpc2l0KHZhbHVlQ29udmVydGVyKSA6IG51bGw7XG4gICAgICBjb25zdCBtYXBCYXNlZFN0eWxlVmFsdWUgPVxuICAgICAgICAgIHRoaXMuX3N0eWxlTWFwSW5wdXQgPyB0aGlzLl9zdHlsZU1hcElucHV0LnZhbHVlLnZpc2l0KHZhbHVlQ29udmVydGVyKSA6IG51bGw7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvdXJjZVNwYW46IHN0eWxpbmdJbnB1dC5zb3VyY2VTcGFuLFxuICAgICAgICByZWZlcmVuY2U6IFIzLmVsZW1lbnRTdHlsaW5nTWFwLFxuICAgICAgICBidWlsZFBhcmFtczogKGNvbnZlcnRGbjogKHZhbHVlOiBhbnkpID0+IG8uRXhwcmVzc2lvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhcmFtczogby5FeHByZXNzaW9uW10gPSBbdGhpcy5fZWxlbWVudEluZGV4RXhwcl07XG5cbiAgICAgICAgICBpZiAobWFwQmFzZWRDbGFzc1ZhbHVlKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChjb252ZXJ0Rm4obWFwQmFzZWRDbGFzc1ZhbHVlKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdHlsZU1hcElucHV0KSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChvLk5VTExfRVhQUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG1hcEJhc2VkU3R5bGVWYWx1ZSkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goY29udmVydEZuKG1hcEJhc2VkU3R5bGVWYWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGlyZWN0aXZlSW5kZXhFeHByKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChvLk5VTExfRVhQUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX2RpcmVjdGl2ZUluZGV4RXhwcikge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2godGhpcy5fZGlyZWN0aXZlSW5kZXhFeHByKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkU2luZ2xlSW5wdXRzKFxuICAgICAgcmVmZXJlbmNlOiBvLkV4dGVybmFsUmVmZXJlbmNlLCBpbnB1dHM6IEJvdW5kU3R5bGluZ0VudHJ5W10sIG1hcEluZGV4OiBNYXA8c3RyaW5nLCBudW1iZXI+LFxuICAgICAgYWxsb3dVbml0czogYm9vbGVhbiwgdmFsdWVDb252ZXJ0ZXI6IFZhbHVlQ29udmVydGVyKTogU3R5bGluZ0luc3RydWN0aW9uW10ge1xuICAgIHJldHVybiBpbnB1dHMubWFwKGlucHV0ID0+IHtcbiAgICAgIGNvbnN0IGJpbmRpbmdJbmRleDogbnVtYmVyID0gbWFwSW5kZXguZ2V0KGlucHV0Lm5hbWUpICE7XG4gICAgICBjb25zdCB2YWx1ZSA9IGlucHV0LnZhbHVlLnZpc2l0KHZhbHVlQ29udmVydGVyKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvdXJjZVNwYW46IGlucHV0LnNvdXJjZVNwYW4sXG4gICAgICAgIHJlZmVyZW5jZSxcbiAgICAgICAgYnVpbGRQYXJhbXM6IChjb252ZXJ0Rm46ICh2YWx1ZTogYW55KSA9PiBvLkV4cHJlc3Npb24pID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSBbdGhpcy5fZWxlbWVudEluZGV4RXhwciwgby5saXRlcmFsKGJpbmRpbmdJbmRleCksIGNvbnZlcnRGbih2YWx1ZSldO1xuICAgICAgICAgIGlmIChhbGxvd1VuaXRzKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQudW5pdCkge1xuICAgICAgICAgICAgICBwYXJhbXMucHVzaChvLmxpdGVyYWwoaW5wdXQudW5pdCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kaXJlY3RpdmVJbmRleEV4cHIpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLnB1c2goby5OVUxMX0VYUFIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9kaXJlY3RpdmVJbmRleEV4cHIpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHRoaXMuX2RpcmVjdGl2ZUluZGV4RXhwcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZENsYXNzSW5wdXRzKHZhbHVlQ29udmVydGVyOiBWYWx1ZUNvbnZlcnRlcik6IFN0eWxpbmdJbnN0cnVjdGlvbltdIHtcbiAgICBpZiAodGhpcy5fc2luZ2xlQ2xhc3NJbnB1dHMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9idWlsZFNpbmdsZUlucHV0cyhcbiAgICAgICAgICBSMy5lbGVtZW50Q2xhc3NQcm9wLCB0aGlzLl9zaW5nbGVDbGFzc0lucHV0cywgdGhpcy5fY2xhc3Nlc0luZGV4LCBmYWxzZSwgdmFsdWVDb252ZXJ0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFN0eWxlSW5wdXRzKHZhbHVlQ29udmVydGVyOiBWYWx1ZUNvbnZlcnRlcik6IFN0eWxpbmdJbnN0cnVjdGlvbltdIHtcbiAgICBpZiAodGhpcy5fc2luZ2xlU3R5bGVJbnB1dHMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9idWlsZFNpbmdsZUlucHV0cyhcbiAgICAgICAgICBSMy5lbGVtZW50U3R5bGVQcm9wLCB0aGlzLl9zaW5nbGVTdHlsZUlucHV0cywgdGhpcy5fc3R5bGVzSW5kZXgsIHRydWUsIHZhbHVlQ29udmVydGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRBcHBseUZuKCk6IFN0eWxpbmdJbnN0cnVjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNvdXJjZVNwYW46IHRoaXMuX2xhc3RTdHlsaW5nSW5wdXQgPyB0aGlzLl9sYXN0U3R5bGluZ0lucHV0LnNvdXJjZVNwYW4gOiBudWxsLFxuICAgICAgcmVmZXJlbmNlOiBSMy5lbGVtZW50U3R5bGluZ0FwcGx5LFxuICAgICAgYnVpbGRQYXJhbXM6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBvLkV4cHJlc3Npb25bXSA9IFt0aGlzLl9lbGVtZW50SW5kZXhFeHByXTtcbiAgICAgICAgaWYgKHRoaXMuX2RpcmVjdGl2ZUluZGV4RXhwcikge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKHRoaXMuX2RpcmVjdGl2ZUluZGV4RXhwcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgYnVpbGRVcGRhdGVMZXZlbEluc3RydWN0aW9ucyh2YWx1ZUNvbnZlcnRlcjogVmFsdWVDb252ZXJ0ZXIpIHtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnM6IFN0eWxpbmdJbnN0cnVjdGlvbltdID0gW107XG4gICAgaWYgKHRoaXMuaGFzQmluZGluZ3NPckluaXRpYWxWYWx1ZXMpIHtcbiAgICAgIGNvbnN0IG1hcEluc3RydWN0aW9uID0gdGhpcy5fYnVpbGRTdHlsaW5nTWFwKHZhbHVlQ29udmVydGVyKTtcbiAgICAgIGlmIChtYXBJbnN0cnVjdGlvbikge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChtYXBJbnN0cnVjdGlvbik7XG4gICAgICB9XG4gICAgICBpbnN0cnVjdGlvbnMucHVzaCguLi50aGlzLl9idWlsZFN0eWxlSW5wdXRzKHZhbHVlQ29udmVydGVyKSk7XG4gICAgICBpbnN0cnVjdGlvbnMucHVzaCguLi50aGlzLl9idWlsZENsYXNzSW5wdXRzKHZhbHVlQ29udmVydGVyKSk7XG4gICAgICBpZiAodGhpcy5fYXBwbHlGblJlcXVpcmVkKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKHRoaXMuX2J1aWxkQXBwbHlGbigpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0NsYXNzQmluZGluZyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5hbWUgPT0gJ2NsYXNzTmFtZScgfHwgbmFtZSA9PSAnY2xhc3MnO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckludG9NYXAobWFwOiBNYXA8c3RyaW5nLCBudW1iZXI+LCBrZXk6IHN0cmluZykge1xuICBpZiAoIW1hcC5oYXMoa2V5KSkge1xuICAgIG1hcC5zZXQoa2V5LCBtYXAuc2l6ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTdHlsZVNhbml0aXphYmxlKHByb3A6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gcHJvcCA9PT0gJ2JhY2tncm91bmQtaW1hZ2UnIHx8IHByb3AgPT09ICdiYWNrZ3JvdW5kJyB8fCBwcm9wID09PSAnYm9yZGVyLWltYWdlJyB8fFxuICAgICAgcHJvcCA9PT0gJ2ZpbHRlcicgfHwgcHJvcCA9PT0gJ2xpc3Qtc3R5bGUnIHx8IHByb3AgPT09ICdsaXN0LXN0eWxlLWltYWdlJztcbn1cbiJdfQ==