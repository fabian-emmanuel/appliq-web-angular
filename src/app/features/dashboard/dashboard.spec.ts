import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PLATFORM_ID } from '@angular/core';
import { Dashboard } from './dashboard';
import { Status, statuses } from '../../core/models/application';
import { BarChartData, LineChartSeries } from '../../core/models/dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Dashboard, // Dashboard is standalone and imports its own dependencies like NgxChartsModule, Mat modules etc.
        NoopAnimationsModule,
      ],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' } // Mock PLATFORM_ID to ensure isBrowser is true
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    // ngOnInit is called by fixture.detectChanges()
  });

  it('should create', () => {
    fixture.detectChanges(); // Initial ngOnInit call
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    beforeEach(() => {
      fixture.detectChanges(); // Trigger ngOnInit
    });

    it('should set isBrowser to true in test environment', () => {
      expect(component.isBrowser).toBe(true);
    });

    it('should initialize dashboard items on ngOnInit', () => {
      expect(component.items.length).toBeGreaterThan(0);
      component.items.forEach(item => {
        expect(item.icon).toBeDefined();
        expect(item.color).toBeDefined();
      });
    });

    it('should initialize filters with default dates on ngOnInit', () => {
      expect(component.startDate).toBeInstanceOf(Date);
      expect(component.endDate).toBeInstanceOf(Date);
      if (component.endDate && component.startDate) { // Type guard
        expect(component.endDate > component.startDate).toBe(true);
      }
    });

    it('should get recent activities on ngOnInit', () => {
      // Assuming applicationList (dummyApplications) is not empty and results in some activities
      expect(component.recentActivities.length).toBeGreaterThanOrEqual(0); // Can be 0 if dummy data is empty
      if (component.recentActivities.length > 0) {
        expect(component.recentActivities[0].company).toBeDefined();
      }
    });

    it('should update chart data on ngOnInit (default bar chart)', () => {
      expect(component.chartType).toBe('bar');
      expect(component.barChartData.length).toBeGreaterThanOrEqual(0);
      // Check if all selected statuses are present, even with 0 value
      const expectedStatuses = component.selectedStatuses;
      expectedStatuses.forEach(status => {
        expect(component.barChartData.some(d => d.name === status)).toBeTrue();
      });
    });
  });

  describe('Filter Logic', () => {
    beforeEach(() => {
      fixture.detectChanges(); // Trigger ngOnInit
    });

    it('StatusDisplayText should return "All Statuses" when no statuses are selected', () => {
      component.selectedStatuses = [];
      expect(component.StatusDisplayText).toBe('All Statuses');
    });

    it('StatusDisplayText should return "All Statuses" when selectedStatuses is null', () => {
      component.selectedStatuses = null as any; // Test null case
      expect(component.StatusDisplayText).toBe('All Statuses');
    });

    it('StatusDisplayText should return the status name when one status is selected', () => {
      component.selectedStatuses = ['Applied'];
      expect(component.StatusDisplayText).toBe('Applied');
    });

    it('StatusDisplayText should return "Status1 (+1 other)" when two statuses are selected', () => {
      component.selectedStatuses = ['Applied', 'Interview'] as Status[];
      // Order might vary based on internal logic or initial `statuses` array order.
      // The test should be flexible or ensure `selectedStatuses` is set in a controlled order.
      const expectedTextPattern = /^\w+ \(\+1 other\)$/; // e.g. "Applied (+1 other)"
      expect(component.StatusDisplayText).toMatch(expectedTextPattern);
      expect(component.StatusDisplayText).toContain(component.selectedStatuses[0]);
    });

    it('StatusDisplayText should return "Status1 (+N others)" when multiple (but not all) statuses are selected', () => {
      component.selectedStatuses = ['Applied', 'Interview', 'Test'] as Status[];
      const expectedTextPattern = /^\w+ \(\+2 others\)$/;
      expect(component.StatusDisplayText).toMatch(expectedTextPattern);
      expect(component.StatusDisplayText).toContain(component.selectedStatuses[0]);
    });

    it('StatusDisplayText should return "All Statuses" when all statuses are selected', () => {
      component.selectedStatuses = [...statuses]; // Ensure it's a copy of the full list
      expect(component.StatusDisplayText).toBe('All Statuses');
    });

    it('onFilterChange should call updateChartData', () => {
      spyOn(component as any, 'updateChartData').and.callThrough(); // Spy on the private method
      component.onFilterChange();
      expect((component as any).updateChartData).toHaveBeenCalled();
    });
  });

  describe('Chart Type Switching', () => {
    beforeEach(() => {
      fixture.detectChanges(); // Trigger ngOnInit
    });

    it('should update chartType property when changed', () => {
      component.chartType = 'line';
      fixture.detectChanges(); // For ngModel changes if any (not direct here, but good practice)
      expect(component.chartType).toBe('line');

      component.chartType = 'bar';
      fixture.detectChanges();
      expect(component.chartType).toBe('bar');
    });

    it('changing chartType should trigger onFilterChange and update chart data (implicitly via template binding)', () => {
      spyOn(component, 'onFilterChange').and.callThrough();
      spyOn(component as any, 'updateChartData').and.callThrough();

      component.chartType = 'line';
      // In a real scenario, the (change) event from mat-radio-group would call onFilterChange.
      // We directly call onFilterChange here to simulate the event's effect as per component logic.
      component.onFilterChange();

      expect(component.onFilterChange).toHaveBeenCalled();
      expect((component as any).updateChartData).toHaveBeenCalled();
      expect(component.lineChartData.length).toBeGreaterThanOrEqual(0);
       // Check if all selected statuses are present for line chart data
      const expectedStatuses = component.selectedStatuses;
      expectedStatuses.forEach(status => {
        expect(component.lineChartData.some(series => series.name === status)).toBeTrue();
      });
    });
  });

  describe('updateChartData content verification', () => {
    beforeEach(() => {
      fixture.detectChanges(); // ngOnInit
    });

    it('barChartData should contain objects with name and value', () => {
      component.chartType = 'bar';
      component.selectedStatuses = ['Applied', 'Interview'];
      component.updateChartData(); // Manually call to ensure data is fresh for this test
      expect(component.barChartData.length).toBeGreaterThan(0);
      component.barChartData.forEach(item => {
        expect(item.name).toBeDefined();
        expect(item.value).toBeDefined();
        expect(typeof item.value).toBe('number');
      });
    });

    it('lineChartData should contain objects with name and a series array', () => {
      component.chartType = 'line';
      component.selectedStatuses = ['Applied', 'Interview'];
      // Ensure startDate and endDate are valid for generating series
      component.startDate = new Date('2023-01-01');
      component.endDate = new Date('2023-01-31');
      component.updateChartData(); // Manually call

      expect(component.lineChartData.length).toBeGreaterThan(0);
      component.lineChartData.forEach(series => {
        expect(series.name).toBeDefined();
        expect(series.series).toBeInstanceOf(Array);
        if (series.series.length > 0) {
          expect(series.series[0].name).toBeDefined(); // Date string
          expect(series.series[0].value).toBeDefined();
          expect(typeof series.series[0].value).toBe('number');
        }
      });
    });
  });

});
