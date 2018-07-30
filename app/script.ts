import { Component, NgModule, Input,EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import {
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";


class Joke {
    setup: string;
    punchline: string;
    hide: boolean;

    constructor(setup: string, punchline: string){
        this.setup = setup;
        this.punchline = punchline;
        this.hide = true;
    }

    toggle() {
        this.hide = !this.hide;
    }
}

@Component({
    selector: 'joke-form',
    templateUrl: `../joke-form-component.html`,
    styleUrls: ['../joke-form-componet.css'],
    //encapsulation: ViewEncapsulation.None
  })

  class JokeFormComponent {
      @Output() jokeCreated = new EventEmitter<Joke>();

      createJoke(setup: string, punchline: string) {
          this.jokeCreated.emit(new Joke(setup, punchline));
      }
  }


@Component ({
    selector: 'joke',
    template: `
    <div class="card card-block">
    <h4 class = "card-tittle">
    <ng-content select=".setup"></ng-content>
     </h4>
    <p class="card-text" [hidden] ="data.hide"> 
    <ng-content select=".punchline"></ng-content>
     </p>
  <a (click)="data.toggle()"
     class="btn btn-warning">Tell Me
  </a>
  <a (click)="deleteItem()"
     class="btn btn-danger">Delete
  </a>  
    </div>
    `
})


class JokeComponent implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {  
        @Input('joke') data: Joke;
      
        constructor() {
          console.log(`new - data is ${this.data}`);
        }
      
        ngOnChanges() {
          console.log(`ngOnChanges - data is ${this.data}`);
        }
      
        ngOnInit() {
          console.log(`ngOnInit  - data is ${this.data}`);
        }
      
        ngDoCheck() {
          console.log("ngDoCheck")
        }
      
        ngAfterContentInit() {
          console.log("ngAfterContentInit");
        }
      
        ngAfterContentChecked() {
          console.log("ngAfterContentChecked");
        }
      
        ngAfterViewInit() {
          console.log("ngAfterViewInit");
        }
      
        ngAfterViewChecked() {
          console.log("ngAfterViewChecked");
        }
      
        ngOnDestroy() {
          console.log("ngOnDestroy");
        }

                @Output() jokeDeleted = new EventEmitter<Joke>();

        deleteItem() {
            this.jokeDeleted.emit(this.data);
        }
    }


    @Component({
        selector: 'joke-list',
        template: `
      <joke *ngFor="let j of jokes" [joke]="j">
        <span class="setup">{{ j.setup }} ?</span>
        <h1 class="punchline">{{ j.punchline }}</h1>
      </joke>
      
      <button type="button"
              class="btn btn-success"
              (click)="addJoke()">Add Joke
      </button>
      <button type="button"
              class="btn btn-danger"
              (click)="deleteJoke()">Clear Jokes
      </button>
      `
      })
      class JokeListComponent {
        jokes: Joke[] = [];
      
        addJoke() {
          this.jokes.unshift(new Joke("What did the cheese say when it looked in the mirror", "Hello-me (Halloumi)"));
        }
      
        deleteJoke() {
          this.jokes = []
        }
      }


@Component({
    selector: 'app',
    template:`
    <joke-list></joke-list>
    `
})

class AppComponent{

}


@NgModule({
    imports:[BrowserModule],
    declarations: [
        JokeComponent,
        JokeListComponent,
        JokeFormComponent,
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);