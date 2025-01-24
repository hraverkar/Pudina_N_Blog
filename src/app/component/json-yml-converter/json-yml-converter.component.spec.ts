import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonYmlConverterComponent } from './json-yml-converter.component';

describe('JsonYmlConverterComponent', () => {
  let component: JsonYmlConverterComponent;
  let fixture: ComponentFixture<JsonYmlConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonYmlConverterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonYmlConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
