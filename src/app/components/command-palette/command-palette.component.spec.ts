import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GLOBAL_CONSTANTS } from 'src/app/global-constants';
import { Color, ExecutionStatus, Face } from 'src/app/models/enums';
import { Position } from 'src/app/models/models';
import { PawnService } from 'src/app/services/pawn.service';

import { CommandPaletteComponent } from './command-palette.component';

describe('CommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;

  let pawnService: PawnService;

  const subscriptions = new Subscription();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommandPaletteComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    pawnService = TestBed.inject(PawnService);

    pawnService.setPawn(new Position());

    fixture.detectChanges();
  }));

  const setPosition = () => component.executeCommand('PLACE 3,3,south,white');

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valid PLACE command', () => {
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.isPawnPlacedOnBoard) {
          expect(position.colPos).toBe(3);
          expect(position.rowPos).toBe(3);
          expect(position.pawnColor).toBe(Color.white);
          expect(position.pawnFace).toBe(Face.south);
          expect(position.log.type).toBe(ExecutionStatus.success);
          expect(position.log.message).toBe(GLOBAL_CONSTANTS.success.validPlace);
        }
      })
    );
    component.executeCommand('PLACE 3,3,south,white');
  });

  it('should not allow MOVE before PLACE command', () => {
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('MOVE')) {
          expect(position.log.type).toBe(ExecutionStatus.error);
          expect(position.log.message).toBe(GLOBAL_CONSTANTS.error.invalidPlace);
        }
      })
    );
    component.executeCommand('MOVE 1');
  });

  it('valid MOVE + 1 command', () => {
    setPosition();
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.isPawnPlacedOnBoard && position?.log?.command.includes('MOVE')) {
          expect(position.colPos).toBe(2);
          expect(position.rowPos).toBe(3);
          expect(position.pawnColor).toBe(Color.white);
          expect(position.pawnFace).toBe(Face.south);
        }
      })
    );
    component.executeCommand('MOVE 1');
  });

  it('valid MOVE + 2 command', () => {
    setPosition();
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.isPawnPlacedOnBoard && position?.log?.command.includes('MOVE')) {
          expect(position.colPos).toBe(1);
          expect(position.rowPos).toBe(3);
          expect(position.pawnColor).toBe(Color.white);
          expect(position.pawnFace).toBe(Face.south);
        }
      })
    );
    component.executeCommand('MOVE 2');
  });

  it('should not allow LEFT before PLACE command', () => {
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('LEFT')) {
          expect(position.log.type).toBe(ExecutionStatus.error);
          expect(position.log.message).toBe(GLOBAL_CONSTANTS.error.invalidPlace);
        }
      })
    );
    component.executeCommand('LEFT');
  });

  it('valid LEFT command', () => {
    setPosition();
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.isPawnPlacedOnBoard && position?.log?.command.includes('LEFT')) {
          expect(position.pawnFace).toBe(Face.east);
        }
      })
    );
    component.executeCommand('LEFT');
  });

  it('should not allow RIGHT before PLACE command', () => {
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('RIGHT')) {
          expect(position.log.type).toBe(ExecutionStatus.error);
          expect(position.log.message).toBe(GLOBAL_CONSTANTS.error.invalidPlace);
        }
      })
    );
    component.executeCommand('RIGHT');
  });

  it('valid RIGHT command', () => {
    setPosition();
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.isPawnPlacedOnBoard && position?.log?.command.includes('RIGHT')) {
          expect(position.pawnFace).toBe(Face.west);
        }
      })
    );
    component.executeCommand('RIGHT');
  });

  it('should not allow REPORT before PLACE command', () => {
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('REPORT')) {
          expect(position.log.type).toBe(ExecutionStatus.error);
          expect(position.log.message).toBe(GLOBAL_CONSTANTS.error.invalidPlace);
        }
      })
    );
    component.executeCommand('REPORT');
  });

  it('valid pawn test #1', () => {
    component.executeCommand('PLACE 0,0,north,white');
    component.executeCommand('MOVE 1');
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('REPORT')) {
          expect(position.log.command).toBe('REPORT Output: 0,1,NORTH,WHITE');
        }
      })
    );
    component.executeCommand('REPORT');
  });

  it('valid pawn test #2', () => {
    component.executeCommand('PLACE 0,0,north,black');
    component.executeCommand('LEFT');
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('REPORT')) {
          expect(position.log.command).toBe('REPORT Output: 0,0,WEST,BLACK');
        }
      })
    );
    component.executeCommand('REPORT');
  });

  it('valid pawn test #3', () => {
    component.executeCommand('PLACE 1,2,east,black');
    component.executeCommand('MOVE 2');
    component.executeCommand('MOVE 1');
    component.executeCommand('LEFT');
    component.executeCommand('MOVE');
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('REPORT')) {
          expect(position.log.command).toBe('REPORT Output: 5,2,NORTH,BLACK');
        }
      })
    );
    component.executeCommand('REPORT');
  });

  it('valid pawn test #4', () => {
    setPosition();
    component.executeCommand('RIGHT');
    component.executeCommand('RIGHT');
    component.executeCommand('MOVE 2');
    component.executeCommand('LEFT');
    component.executeCommand('MOVE 1');
    subscriptions.add(
      pawnService.observePawn().subscribe(position => {
        if (position?.log?.command.includes('REPORT')) {
          expect(position.log.command).toBe('REPORT Output: 2,5,WEST,WHITE');
        }
      })
    );
    component.executeCommand('REPORT');
  });

  afterAll(() => {
    subscriptions.unsubscribe();
  });
});
