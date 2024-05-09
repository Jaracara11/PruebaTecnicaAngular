import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { UpsertArticleComponent } from './components/upsert-article/upsert-article.component';

const routes: Routes = [
  { path: 'upsert-article', component: UpsertArticleComponent },
  { path: 'upsert-article/:article', component: UpsertArticleComponent },
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
