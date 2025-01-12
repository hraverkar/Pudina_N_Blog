import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidGenerationComponent } from './guid-generation.component';

describe('GuidGenerationComponent', () => {
  let component: GuidGenerationComponent;
  let fixture: ComponentFixture<GuidGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuidGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
