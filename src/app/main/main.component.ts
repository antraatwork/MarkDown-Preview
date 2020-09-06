import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//marked package to change inputs to html
import * as marked from 'marked';
import defaultUserString from '../constants';

// If breaks is true, it will add <br> on a single line break
marked.setOptions({
  gfm: true,
  breaks: true,
})

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit,OnDestroy{

  constructor(public router: Router, public route: ActivatedRoute) { }

  //whenever this component initializes this method is invoked  and after 2 sec loader disappears and 
  // the component's view appears
  public loader() {

    setTimeout(this.openMainPage, 2000);
  }

  public openMainPage() {

    document.getElementById("loader").style.display = "none";
    document.getElementById("fullbody").style.display = "block";


  }

  //input changed to html is stored in values
  public values: string;

  //default input in editor
  public defaultinput: string = defaultUserString;
   
  //input in the editor
  public input: string;

  //to show preview bydefault whenever component loads
  public optionvalue: string = 'preview';


  //updatePreview invokes whenever is keyup event happens and this.input has the value from the target ,updates the
  //localstorage's defaultinput and then this.input is changed to html using marked package and stored in this.values
  public updatePreview(event) {

    this.input = event.target.value;

    //localstorage's defaultinput is updated by this.input  here this.input is input by user in editor 
    localStorage.setItem('defaultinput', JSON.stringify(this.input));
    this.values = marked(this.input);
    console.log("update" + this.values);


  }

  //this method invokes everytime on ngOnInit() and the this.input is changed to html using marked package
  public initialPreview() {

    this.values = marked(this.input);
    console.log(this.values);

  }

  //this method is used navigate to preview window and invokes when the Preview button is clicked
  public clickLink() {

    this.router.navigate(['/preview']);

  }


  ngOnInit() {

    //everytime this component initializes then the loader method is invoked 
    this.loader();

     
    //get the this.input as parsed value from localstorage's defaultinput.
    if(localStorage.getItem('defaultinput') == undefined || localStorage.getItem('defaultinput') == " "){
       console.log("hiii");
       localStorage.setItem('defaultinput', JSON.stringify(this.defaultinput));

    }
    this.input = JSON.parse(localStorage.getItem('defaultinput'));


    //this method in invoked to get the preview of this.input taken from localstorage,initially whenever the component 
    //loads
    this.initialPreview();

  }

  ngOnDestroy(){

    localStorage.setItem('defaultinput', JSON.stringify(this.input));


  }
}
