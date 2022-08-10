let start = performance.now();
let original = {};
let interfaces = {
    'document': Document,
    'element': Element,
    'node': Node,
    'HTMLElement': HTMLElement,
    'HTMLInputElement': HTMLInputElement,
    'DOMTokenList': DOMTokenList,
    'HTMLMediaElement': HTMLMediaElement,
    'HTMLTextAreaElement': HTMLTextAreaElement,
    'HTMLVideoElement': HTMLVideoElement,
    'HTMLBodyElement': HTMLBodyElement,
    'HTMLAnchorElement': HTMLAnchorElement,
    'HTMLImageElement': HTMLImageElement,
    'HTMLObjectElement': HTMLObjectElement,
    'HTMLSelectElement': HTMLSelectElement,
    'HTMLTableElement': HTMLTableElement,
    'HTMLAreaElement': HTMLAreaElement,
    'HTMLIFrameElement': HTMLIFrameElement,
    'HTMLLinkElement': HTMLLinkElement,
    'HTMLButtonElement': HTMLButtonElement,
    'HTMLFormElement': HTMLFormElement,
    'HTMLTableCellElement': HTMLTableCellElement,
    'HTMLMarqueeElement': HTMLMarqueeElement,
    'HTMLOutputElement': HTMLOutputElement,
    'HTMLScriptElement': HTMLScriptElement,
    'HTMLFieldSetElement': HTMLFieldSetElement,
    'HTMLTrackElement': HTMLTrackElement,
    'HTMLFrameElement': HTMLFrameElement,
    'HTMLTableRowElement': HTMLTableRowElement,
    'HTMLOptionElement': HTMLOptionElement,
    'HTMLCanvasElement': HTMLCanvasElement,
    'HTMLEmbedElement': HTMLEmbedElement,
    'HTMLMeterElement': HTMLMeterElement,
    'HTMLTableSectionElement': HTMLTableSectionElement,
    'HTMLTableColElement': HTMLTableColElement,
    'HTMLDialogElement': HTMLDialogElement,
    'HTMLHRElement': HTMLHRElement,
    'HTMLSourceElement': HTMLSourceElement,
    'HTMLMetaElement': HTMLMetaElement,
    'HTMLOListElement': HTMLOListElement,
    'HTMLParamElement': HTMLParamElement,
    'HTMLProgressElement': HTMLProgressElement,
    'HTMLStyleElement': HTMLStyleElement,
    'HTMLFontElement': HTMLFontElement,
    'HTMLLabelElement': HTMLLabelElement,
    'HTMLSlotElement': HTMLSlotElement,
    'HTMLBaseElement': HTMLBaseElement,
    'HTMLLegendElement': HTMLLegendElement,
    'HTMLLIElement': HTMLLIElement,
    'HTMLMapElement': HTMLMapElement,
    'HTMLModElement': HTMLModElement,
    'HTMLOptGroupElement': HTMLOptGroupElement,
    'HTMLUListElement': HTMLUListElement,
    'HTMLBRElement': HTMLBRElement,
    'HTMLDataElement': HTMLDataElement,
    'HTMLDataListElement': HTMLDataListElement,
    'HTMLDetailsElement': HTMLDetailsElement,
    'HTMLDirectoryElement': HTMLDirectoryElement,
    'HTMLDivElement': HTMLDivElement,
    'HTMLDListElement': HTMLDListElement,
    'HTMLHeadingElement': HTMLHeadingElement,
    'HTMLHtmlElement': HTMLHtmlElement,
    'HTMLMenuElement': HTMLMenuElement,
    'HTMLParagraphElement': HTMLParagraphElement,
    'HTMLPreElement': HTMLPreElement,
    'HTMLQuoteElement': HTMLQuoteElement,
    'HTMLTableCaptionElement': HTMLTableCaptionElement,
    'HTMLTemplateElement': HTMLTemplateElement,
    'HTMLTimeElement': HTMLTimeElement,
    'HTMLTitleElement': HTMLTitleElement,
    'SVGElement': SVGElement,
    'SVGAnimatedString': SVGAnimatedString,
    'SVGSVGElement': SVGSVGElement,
    'SVGPoint': SVGPoint,
    'SVGFEBlendElement': SVGFEBlendElement,
    'SVGAnimatedEnumeration': SVGAnimatedEnumeration,
    'SVGAnimatedLength': SVGAnimatedLength,
    'SVGLength': SVGLength,
    'SVGAnimatedPreserveAspectRatio': SVGAnimatedPreserveAspectRatio,
    'SVGPreserveAspectRatio': SVGPreserveAspectRatio,
    'SVGAnimatedRect': SVGAnimatedRect,
    'SVGRect': SVGRect,
    'SVGFEConvolveMatrixElement': SVGFEConvolveMatrixElement,
    'SVGAnimatedInteger': SVGAnimatedInteger,
    'SVGAnimatedBoolean': SVGAnimatedBoolean,
    'SVGAnimatedNumberList': SVGAnimatedNumberList,
    'SVGNumberList': SVGNumberList,
    'SVGAnimatedNumber': SVGAnimatedNumber,
    'SVGFECompositeElement': SVGFECompositeElement,
    'SVGFETurbulenceElement': SVGFETurbulenceElement,
    'CharacterData': CharacterData,
    'SVGMarkerElement': SVGMarkerElement,
    'SVGAnimatedAngle': SVGAnimatedAngle,
    'SVGAngle': SVGAngle,
    'SVGFEDisplacementMapElement': SVGFEDisplacementMapElement,
    'SVGTextContentElement': SVGTextContentElement,
    'SVGAnimationElement': SVGAnimationElement,
    'SVGStringList': SVGStringList,
    'SVGComponentTransferFunctionElement': SVGComponentTransferFunctionElement,
    'SVGFEColorMatrixElement': SVGFEColorMatrixElement,
    'SVGFEMorphologyElement': SVGFEMorphologyElement,
    'SVGPatternElement': SVGPatternElement,
    'SVGFEDropShadowElement': SVGFEDropShadowElement,
    'SVGFESpecularLightingElement': SVGFESpecularLightingElement,
    'SVGFEDiffuseLightingElement': SVGFEDiffuseLightingElement,
    'SVGTextPathElement': SVGTextPathElement,
    'SVGFEGaussianBlurElement': SVGFEGaussianBlurElement,
    'SVGFEOffsetElement': SVGFEOffsetElement,
    'SVGFESpotLightElement': SVGFESpotLightElement,
    'SVGGradientElement': SVGGradientElement,
    'SVGGraphicsElement': SVGGraphicsElement,
    'SVGImageElement': SVGImageElement,
    'SVGMaskElement': SVGMaskElement,
    'SVGFEImageElement': SVGFEImageElement,
    'SVGFilterElement': SVGFilterElement,
    'SVGFEComponentTransferElement': SVGFEComponentTransferElement,
    'SVGFETileElement': SVGFETileElement,
    'SVGRadialGradientElement': SVGRadialGradientElement,
    'SVGRectElement': SVGRectElement,
    'SVGViewElement': SVGViewElement,
    'SVGFEFloodElement': SVGFEFloodElement,
    'SVGFEMergeElement': SVGFEMergeElement,
    'SVGGeometryElement': SVGGeometryElement,
    'SVGStyleElement': SVGStyleElement,
    'SVGTextPositioningElement': SVGTextPositioningElement,
    'SVGUseElement': SVGUseElement,
    'SVGEllipseElement': SVGEllipseElement,
    'SVGForeignObjectElement': SVGForeignObjectElement,
    'SVGLinearGradientElement': SVGLinearGradientElement,
    'SVGLineElement': SVGLineElement,
    'SVGCircleElement': SVGCircleElement,
    'SVGFEPointLightElement': SVGFEPointLightElement,
    'SVGAElement': SVGAElement,
    'SVGFEDistantLightElement': SVGFEDistantLightElement,
    'SVGPolygonElement': SVGPolygonElement,
    'SVGPolylineElement': SVGPolylineElement,
    'SVGScriptElement': SVGScriptElement,
    'SVGSymbolElement': SVGSymbolElement,
    'SVGClipPathElement': SVGClipPathElement,
    'SVGFEMergeNodeElement': SVGFEMergeNodeElement,
    'SVGMPathElement': SVGMPathElement,
    'SVGStopElement': SVGStopElement,
    'Attr': Attr,
    'EventTarget': EventTarget,
    'NamedNodeMap': NamedNodeMap,
	'CustomElementRegistry': CustomElementRegistry,
    'Range': Range,
    'IntersectionObserver': IntersectionObserver,
    'MutationObserver': MutationObserver,
    'ResizeObserver': ResizeObserver,
    'WebKitMutationObserver': WebKitMutationObserver,
    'NodeIterator': NodeIterator,
    'StyleSheet': StyleSheet,
    'Text':Text,
    'Selection':Selection,
    'DocumentFragment':DocumentFragment
};

let interfaces_no_prototype = {
    'Object': Object,
    'window': window
};

original['MutationObserver'] = MutationObserver;
original['ResizeObserver'] =ResizeObserver;

original['DOMParser.parseFromString'] = DOMParser.prototype.parseFromString;
original['option'] = Option;
original['image'] = Image;
original['audio'] = Audio;
original['DOMImplementation.createDocument'] = DOMImplementation.prototype.createDocument;
original['DOMImplementation.createHTMLDocument'] = DOMImplementation.prototype.createHTMLDocument;
original['shadowRoot.prototype.innerHTML_setter'] = ShadowRoot.prototype.__lookupSetter__('innerHTML');
original['XMLHttpRequest.responseXML_getter'] = XMLHttpRequest.prototype.__lookupGetter__('responseXML');
original['Range.createContextualFragment'] = Range.prototype.createContextualFragment;

let interfaces_name = Object.getOwnPropertyNames(interfaces);
for (let i = 0; i < interfaces_name.length; i++) {
    let interface_name = interfaces_name[i];
    let interface_object = interfaces[interface_name];
    let functions_name = Object.getOwnPropertyNames(interface_object.prototype);
    for (let j = 0; j < functions_name.length; j++) {
        let function_name = functions_name[j];
        let getter = Object.getOwnPropertyDescriptor(interface_object.prototype, function_name).get;
        let setter = Object.getOwnPropertyDescriptor(interface_object.prototype, function_name).set;
        if (getter)
            original[interface_name + '.' + function_name + '_getter'] = getter;
        if (setter)
            original[interface_name + '.' + function_name + '_setter'] = setter;
        if (!getter && !setter)
            original[interface_name + '.' + function_name] = interface_object.prototype[function_name];
    }
}

let interfaces_name_no_prototype = Object.getOwnPropertyNames(interfaces_no_prototype);
for (let i = 0; i < interfaces_name_no_prototype.length; i++) {
    let interface_name = interfaces_name_no_prototype[i];
    let interface_object = interfaces_no_prototype[interface_name];
    let functions_name = Object.getOwnPropertyNames(interface_object);
    for (let j = 0; j < functions_name.length; j++) {
        let function_name = functions_name[j];
        let getter = Object.getOwnPropertyDescriptor(interface_object, function_name).get;
        let setter = Object.getOwnPropertyDescriptor(interface_object, function_name).set;
        if (getter)
            original[interface_name + '.' + function_name + '_getter'] = getter;
        if (setter)
            original[interface_name + '.' + function_name + '_setter'] = setter;
        if (!getter && !setter)
            original[interface_name + '.' + function_name] = interface_object[function_name];
    }
}


window.overriding_delay = performance.now() - start; // Should be removed from the released version


export {original, interfaces};