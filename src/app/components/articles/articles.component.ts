import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/repository/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  filterForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      filter: [''],
    });
  }

  ngOnInit(): void {
    this.getAllArticles();
  }

  filteredArticles(): Article[] {
    const searchText = this.filterForm.get('filter').value.toLowerCase();
    return this.articles.filter((article: Article) => {
      return (
        article.codigo.toLowerCase().includes(searchText) ||
        article.nombre.toLowerCase().includes(searchText) ||
        article.tipo.toLowerCase().includes(searchText) ||
        article.marca.toLowerCase().includes(searchText) ||
        article.precio.toString().toLowerCase().includes(searchText)
      );
    });
  }

  addArticle(): void {
    this.router.navigate(['/upsert-article']);
  }

  editArticle(article: Article): void {
    const articleJson = JSON.stringify(article);
    this.router.navigate(['/upsert-article', { article: articleJson }]);
  }

  private getAllArticles(): void {
    this.articleService.getAllArticles().subscribe((result) => {
      this.articles = result;
    });
  }
}
