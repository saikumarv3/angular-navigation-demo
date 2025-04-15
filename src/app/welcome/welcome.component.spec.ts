import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { PrefillService } from '../services/prefill.service';
import { RouterTestingModule } from '@angular/router/testing';
import { jest } from '@jest/globals';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let router: Router;
  let prefillService: PrefillService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WelcomeComponent,
        RouterTestingModule
      ],
      providers: [
        {
          provide: PrefillService,
          useValue: {
            clearAnswers: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    prefillService = TestBed.inject(PrefillService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('startWizard', () => {
    it('should clear answers and navigate to product selection', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      const clearAnswersSpy = jest.spyOn(prefillService, 'clearAnswers');

      component.startWizard();

      expect(clearAnswersSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/page', 'product-selection']);
    });
  });

  describe('startWithPrefill', () => {
    it('should navigate to product selection with prefill parameter', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');

      component.startWithPrefill();

      expect(navigateSpy).toHaveBeenCalledWith(['/page', 'product-selection', 'prefill']);
    });
  });

  describe('template', () => {
    it('should render welcome message and buttons', () => {
      const compiled = fixture.nativeElement;
      
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to the Setup Wizard');
      expect(compiled.querySelector('p').textContent).toContain('This wizard will help you configure your new device.');
      
      const buttons = compiled.querySelectorAll('button');
      expect(buttons.length).toBe(2);
      expect(buttons[0].textContent).toContain('Start Setup');
      expect(buttons[1].textContent).toContain('Start with Sample Data');
    });

    it('should call startWizard when Start Setup button is clicked', () => {
      const startWizardSpy = jest.spyOn(component, 'startWizard');
      const button = fixture.nativeElement.querySelector('.start-button');
      
      button.click();
      
      expect(startWizardSpy).toHaveBeenCalled();
    });


  });
}); 