<article>
  <h1>Study Words</h1>
  <div *ngFor="let post of data.posts">
    <a [routerLink]="'/study-words/' + post['title_slug']">{{post.title}}</a>
  </div>
</article>

yea will it hurts but i am trying