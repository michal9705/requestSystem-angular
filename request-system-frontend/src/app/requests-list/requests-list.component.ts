import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../services/requests.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddRequestFormComponent } from '../add-request-form/add-request-form.component'; // עדכן את הנתיב בהתאם
import { MatSnackBar } from '@angular/material/snack-bar';

interface Request {
  requesterName: string;
  subject: string;
  submissionDate: string;
}

@Component({
  standalone: true,
  selector: 'requests-list',
  templateUrl: './requests-list.component.html',
  imports: [HttpClientModule, CommonModule, MatDialogModule]
})
export class RequestsListComponent implements OnInit {

  requests: Request[] = [];
  constructor(
    private requestsService: RequestsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }


  openAddRequestDialog() {
    const dialogRef = this.dialog.open(AddRequestFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requestsService.addRequest(result).subscribe({
          next: (newRequestFromServer) => {
            this.requests.push(newRequestFromServer);
            this.snackBar.open('הפנייה נוספה בהצלחה', '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });

          },
          error: err => console.error("Failed to add request", err)
        });
      }
    });
  }

  ngOnInit(): void {
    this.requestsService.getRequests().subscribe({
      next: (data) => this.requests = data,
      error: (err) => console.error('Error loading requests', err)
    });
  }
}
