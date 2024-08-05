import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task, ApiResponse } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: ['']
    });
  }

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe((response: ApiResponse<Task>) => {
        if (response.success && response.data) {
          const task = response.data;
          // Log the raw deadline received from the server
          console.log('Raw deadline from server:', task.deadline);

          // Convert the deadline to yyyy-MM-dd format
          const deadline = task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '';
          console.log('Formatted deadline for input:', deadline);

          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            deadline: deadline
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      // Ajuste para converter a data para o formato ISO se necessário
      formValue.deadline = formValue.deadline ? new Date(formValue.deadline).toISOString() : null;

      if (this.taskId) {
        this.taskService.updateTask(this.taskId, formValue).subscribe(response => {
          if (response.success) {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.taskService.createTask(formValue).subscribe(response => {
          if (response.success) {
            this.router.navigate(['/']);
          }
        });
      }
    }
  }


}
