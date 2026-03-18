import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DocumentService } from '../../core/services/document.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {
  documents: any[] = [];
  lastViewed: any;
  lastViewedTime: any;
  error = '';

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Add a loadLastViewed method call (Add one in authService)
    await this.loadDocuments();
  }

  async loadDocuments(): Promise<void> {
    try {
      const response = await this.documentService.getAll();
      this.documents = response.documents;
      this.lastViewed = response.lastViewed || '';
      this.lastViewedTime = response.lastViewedTime || '';
    } catch (err: any) {
      this.error = err?.error?.message || 'Failed to load documents';
    }
  }

  editDocument(id: string): void {
    this.router.navigate(['/documents/edit', id]);
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      await this.documentService.delete(id);
      await this.loadDocuments();
    } catch (err: any) {
      this.error = err?.error?.message || 'Failed to delete document';
    }
  }
}