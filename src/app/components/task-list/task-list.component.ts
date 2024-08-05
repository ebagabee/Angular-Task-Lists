import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterText: string = '';

  constructor(public router: Router, private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(response => {
      if (response.success) {
        this.tasks = response.data;
        this.filteredTasks = this.tasks;
      }
    });
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(this.filterText.toLowerCase()))
    );
  }

  calculateDaysRemaining(deadline?: string): string {
  if (!deadline) {
    return 'Sem data';
  }

  const deadlineDate = new Date(deadline);
  const today = new Date();
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysRemaining < 0) {
    return 'Prazo Encerrado';
  }
  
  return `${daysRemaining} dia(s) restantes`;
}


  editTask(id: number) {
    this.router.navigate(['/edit-task', id]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(response => {
      if (response.success) {
        this.loadTasks();
      }
    });
  }
}
