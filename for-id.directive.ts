import { AfterViewInit, Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appForId]',
})
export class ForIdDirective implements AfterViewInit {
    //////////////////////////////////////////////////////

    @Input('appForId') forId: string;

    @HostBinding('attr.data-for-id') get dataForId() {
        return this.forId;
    }

    //////////////////////////////////////////////////////
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const tagInfo = {
            input: { attribute: 'id', complementaryAttribute: 'for' },
            label: { attribute: 'for', complementaryAttribute: 'id' },
        };

        // Check if the element is an input or a label
        const elementTag = this.el.nativeElement.tagName.toLowerCase();
        const currentElementInfo = tagInfo[elementTag];

        // Check if the attribute has already been assigned
        if (this.el.nativeElement.getAttribute(currentElementInfo.attribute)) return;

        // Search the nearest .control-group ancestor for a matching pair
        const parentControlGroup = this.el.nativeElement.closest('.control-group');
        if (!parentControlGroup) {
            console.warn(`appForId: Unable to find associated control for ${elementTag} element (${this.forId}). Missing parent element with class .control-group.`);
            return;
        }

        // Generate a random number
        const randomId = this.forId + '-' + Math.floor(Math.random() * 1000000).toString();
        this.renderer.setAttribute(this.el.nativeElement, currentElementInfo.attribute, randomId);

        const pairElement = parentControlGroup.querySelector(`[data-for-id="${this.forId}"]:not(${elementTag})`);
        const pairElementAttribute = currentElementInfo.complementaryAttribute;

        // Check if the pair element already has the attribute assigned
        if (pairElement && !pairElement.getAttribute(pairElementAttribute)) {
            this.renderer.setAttribute(pairElement, pairElementAttribute, randomId);
        }
    }
}
