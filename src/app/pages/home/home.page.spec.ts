import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule, ComponentsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create app-board', () => {
    const appBoard = fixture.debugElement.query(By.css('#appBoard'));
    expect(appBoard).toBeTruthy();
  });

  it('should create app-command-palette', () => {
    const appBoard = fixture.debugElement.query(By.css('#appCommandPalette'));
    expect(appBoard).toBeTruthy();
  });

  it('should create app-logs', () => {
    const appBoard = fixture.debugElement.query(By.css('#appLogs'));
    expect(appBoard).toBeTruthy();
  });
});
