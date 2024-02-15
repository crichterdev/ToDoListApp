import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskModalComponent } from './add-task-modal.component';
import { TodoService } from '../todo.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

fdescribe('AddTaskModalComponent', () => {
  let component: AddTaskModalComponent;
  let fixture: ComponentFixture<AddTaskModalComponent>;
  let mockDialogRef: MatDialogRef<AddTaskModalComponent>;
  let mockTodoService: TodoService;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockTodoService = jasmine.createSpyObj('TodoService', ['createTask']);

    TestBed.configureTestingModule({
      declarations: [AddTaskModalComponent],
      imports: [ CommonModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: TodoService, useValue: mockTodoService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty title', () => {
    expect(component.addForm.value.taskTitle).toBe('');
  });

  it('should show required error when submitting with empty title', () => {
    component.onSubmit();
    expect(component.addForm.get('taskTitle')?.hasError('required')).toBeTruthy();
  });

  it('should show minlength error when submitting with short title', () => {
    const shortTitle = 'abc';
    component.addForm.patchValue({ taskTitle: shortTitle });
    component.onSubmit();
    expect(component.addForm.get('taskTitle')?.hasError('minlength')).toBeTruthy();
  });

  it('should call todoService.createTask and close dialog when submitting with valid form', () => {
    const validTitle = 'Valid Task';
    component.addForm.patchValue({ taskTitle: validTitle });
    const mockCreatedTask = { id: 1, title: validTitle, isDone: false };
    (mockTodoService.createTask as jasmine.Spy).and.returnValue(of(mockCreatedTask));

    component.onSubmit();

    expect(mockTodoService.createTask).toHaveBeenCalledWith({
      id: 0,
      title: validTitle,
      isDone: false,
    });
    expect(mockDialogRef.close).toHaveBeenCalledWith(mockCreatedTask);
  });

  it('should close dialog when cancelling', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  // Validations

  it('should show required error when title is touched and empty', () => {
    const titleInput = component.addForm.get('taskTitle');
    titleInput?.setValue('');
    titleInput?.markAsTouched();

    fixture.detectChanges();
    const requiredError = fixture.nativeElement.querySelector('.mat-error');
    expect(requiredError.textContent).toContain('Title is required');
  });

  it('should show minlength error when title is touched and too short', fakeAsync(() => {
    const titleInput = component.addForm.get('taskTitle');
    titleInput?.setValue('abc');
    titleInput?.markAsUntouched();

    fixture.detectChanges();
    tick();

    const minlengthError = fixture.nativeElement.querySelector('.mat-error');
    expect(minlengthError.textContent).toContain('Title must be at least 4 characters long');
  }));

  it('should not show errors when form is pristine', () => {
    const titleInput = component.addForm.get('taskTitle');
    titleInput?.setValue('');
    titleInput?.markAsTouched();

    fixture.detectChanges();
    const errors = fixture.nativeElement.querySelectorAll('.mat-error');
    expect(errors.length).toBe(2);
  });

});

