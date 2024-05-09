import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      codigo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      tipo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      marca: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      precio: [
        '',
        [Validators.required, Validators.min(0.01), Validators.max(99999999)],
      ],
    });

    const articleParam = this.route.snapshot.paramMap.get('article');

    if (articleParam) {
      this.editMode = true;
      this.article = JSON.parse(articleParam) as Article;
      this.editForm.patchValue({
        codigo: this.article.codigo,
        nombre: this.article.nombre,
        tipo: this.article.tipo,
        marca: this.article.marca,
        precio: this.article.precio,
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    const formValue = this.editForm.value;

    if (this.editMode) {
      this.article.codigo = formValue.codigo;
      this.article.nombre = formValue.nombre;
      this.article.tipo = formValue.tipo;
      this.article.marca = formValue.marca;
      this.article.precio = formValue.precio;

      this.articleService.updateArticle(this.article).subscribe(
        () => {
          this.router.navigate(['/articles']);
        },
        (error) => {
          window.alert('Error editando articulo: ' + error.error.error);
        }
      );
    } else {
      const newArticle: Article = {
        codigo: formValue.codigo,
        nombre: formValue.nombre,
        tipo: formValue.tipo,
        marca: formValue.marca,
        precio: formValue.precio,
      };

      this.articleService.addNewArticle(newArticle).subscribe(
        () => {
          this.router.navigate(['/articles']);
        },
        (error) => {
          window.alert('Error agregando articulo: ' + error.error.error);
        }
      );
    }
  }

  deleteArticle(): void {
    const confirmed = window.confirm('Seguro que desea borrar este articulo?');
    if (confirmed) {
      this.articleService.deleteArticleByCode(this.article.codigo).subscribe(
        () => {
          this.router.navigate(['/articles']);
        },
        (error) => {
          window.alert('Error borrando articulo: ' + error.error.error);
        }
      );
    }
  }
}
