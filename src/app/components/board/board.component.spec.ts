import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Color, Face } from 'src/app/models/enums';
import { Position } from 'src/app/models/models';
import { PawnService } from 'src/app/services/pawn.service';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  let pawnService: PawnService;
  let defaultPosition: Position;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [IonicModule.forRoot()],
      providers: [PawnService]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    pawnService = TestBed.inject(PawnService);
    component = fixture.componentInstance;

    defaultPosition = {
      colPos: 5,
      rowPos: 6,
      pawnColor: Color.black,
      pawnFace: Face.east,
    };
    pawnService.setPawn(defaultPosition);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check pawn position', () => {
    pawnService.observePawn().subscribe((position: Position) => {
      if (position.isPawnPlacedOnBoard) {
        expect(position.colPos).toBe(defaultPosition.colPos);
        expect(position.rowPos).toBe(defaultPosition.rowPos);
        expect(position.pawnColor).toBe(defaultPosition.pawnColor);
        expect(position.pawnFace).toBe(defaultPosition.pawnFace);
      }
    });
  });

  it('check pawn direction class added (east/East)', () => {
    const icon = fixture.debugElement.query(By.css('.East'));
    expect(icon.name).toBeTruthy();
  });

  it('check correct colored pawn added (black/secondary)', () => {
    const icon = fixture.debugElement.query(By.css('.East'));
    expect(icon.properties.color).toBe('secondary');
  });
});
