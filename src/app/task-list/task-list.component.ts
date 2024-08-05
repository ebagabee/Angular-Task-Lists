import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(response => {
      if (response.success) {
        this.tasks = response.data; // Ajuste para acessar a propriedade 'data'
      }
    });
  }
}
