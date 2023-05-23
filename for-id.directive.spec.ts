import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForIdDirective } from './for-id.directive';

@Component({
    template: `
        <div class="control-group">
            <label [appForId]="'pair1'">Label 1</label>
            <input [appForId]="'pair1'" />
        </div>
        <div>
            <label [appForId]="'pair2'">Label 2</label>
            <input [appForId]="'pair2'" />
        </div>
        <div class="control-group">
            <label [appForId]="'pair3'">Label 3</label>
        </div>
        <div class="control-group">
            <input [appForId]="'pair4'" />
        </div>
        <div class="control-group">
            <label [appForId]="'pair5'">Label 5</label>
            <div class="custom-control">
                <span class="search-box">
                    <input />
                </span>
                <input [appForId]="'pair5'" />
            </div>
        </div>
    `,
})
class TestHostComponent {}

describe('shared / directives / for-id.directive', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let labels: HTMLLabelElement[];
    let inputs: HTMLInputElement[];

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [ForIdDirective, TestHostComponent],
        });

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();

        labels = Array.from(fixture.nativeElement.querySelectorAll('label'));
        inputs = Array.from(fixture.nativeElement.querySelectorAll('input'));
    });

    it('should pair input and label within the same control-group', () => {
        const label = labels.find(label => label.textContent === 'Label 1');
        const input = inputs.find(input => input.getAttribute('data-for-id') === 'pair1');

        expect(label.getAttribute('for')).toBeTruthy();
        expect(input.getAttribute('id')).toBeTruthy();
        expect(label.getAttribute('for')).toEqual(input.getAttribute('id'));
    });

    it('should not pair input and label outside a control-group', () => {
        const label = labels.find(label => label.textContent === 'Label 2');
        const input = inputs.find(input => input.getAttribute('data-for-id') === 'pair2');

        expect(label.getAttribute('for')).toBeNull();
        expect(input.getAttribute('id')).toBeNull();
    });

    it('should set for attribute even if label has no matching input', () => {
        const label = labels.find(label => label.textContent === 'Label 3');

        expect(label.getAttribute('for')).toBeTruthy();
    });

    it('should set id attribute even if input has no matching label', () => {
        const input = inputs.find(input => input.getAttribute('data-for-id') === 'pair4');

        expect(input.getAttribute('id')).toBeTruthy();
    });

    it('should pair input and label even within a complex custom component', () => {
        const label = labels.find(label => label.textContent === 'Label 5');
        const input = inputs.find(input => input.getAttribute('data-for-id') === 'pair5');

        expect(label.getAttribute('for')).toBeTruthy();
        expect(input.getAttribute('id')).toBeTruthy();
        expect(label.getAttribute('for')).toEqual(input.getAttribute('id'));
    });
});
