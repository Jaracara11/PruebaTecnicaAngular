import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/repository/article.service';

@Component({
  selector: 'app-upsert-article',
  templateUrl: './upsert-article.component.html',
  styleUrls: ['./upsert-article.component.css'],
})
export class UpsertArticleComponent implements OnInit {
  editForm: FormGroup;
  editMode: boolean = false;
  article: Article;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      codigo: [''],
      nombre: [''],
      tipo: [''],
      marca: [''],
      precio: [''],
    });

    this.route.paramMap.subscribe((params) => {
      if (params.has('article')) {
        this.editMode = true;
        this.article = JSON.parse(params.get('article') as string) as Article;
        this.editForm.patchValue({
          codigo: this.article.codigo,
          nombre: this.article.nombre,
          tipo: this.article.tipo,
          marca: this.article.marca,
          precio: this.article.precio,
        });
      }
    });
  }
  onSubmit(): void {
    const formValue = this.editForm.value;
    if (this.editMode) {
      this.article.codigo = formValue.codigo;
      this.article.nombre = formValue.nombre;
      this.article.tipo = formValue.tipo;
      this.article.marca = formValue.marca;
      this.article.precio = formValue.precio;
      this.articleService.updateArticle(this.article).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    } else {
      const newArticle: Article = {
        codigo: formValue.codigo,
        nombre: formValue.nombre,
        tipo: formValue.tipo,
        marca: formValue.marca,
        precio: formValue.precio,
      };

      this.articleService.addNewArticle(newArticle).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    }
  }
}
