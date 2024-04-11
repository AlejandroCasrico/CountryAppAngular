import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debounceSubscription?:Subscription;
  @Input()
  public placeholder:string = '';
  @Input()
  public initialValue:string= "";
  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
   this.debounceSubscription = this.debouncer
   .pipe(
    debounceTime(1000)
   )

   .subscribe(value =>{
    this.onDebounce.emit(value)
   })
  }
  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe()

  }
  emitValue(value:string){
    this.onValue.emit(value);
  }
  onKeyPress(searchTerm:string){
   this.debouncer.next(searchTerm);
  }
}
