import { Component, OnInit,OnDestroy } from '@angular/core';
//marked package to change inputs to html
import * as marked from 'marked';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})

export class PreviewComponent implements OnInit,OnDestroy {

  constructor() { }

  //input changed to html is stored in values
  public values: string;

  //default input in editor
  public defaultinput: string =
    `
   - Item1
   - Item2
        - Item2a
        - Item2b
        
     ### This is h3 tag
     ## This is h2 tag
     # This is h1 tag
     > h1 in blockquote
     ===   

     [url]: /http://www.github.com/

     **This is strong**

     *This is italic*

     ~~~
     Code
     ~~~
         Code

     \`this is code block\`    
     <dl>
     <dt>Definition list</dt>
     <dd>Is something people use sometimes.</dd>
     </dl>  

     <img src="../../assets/images/smile.jpg" title="*"/>

     
     
  `;

  //input in the editor
  public input: string;

  //this method invokes everytime on ngOnInit() and the this.input is changed to html using marked package
  public initialPreview() {

    this.values = marked(this.input);
    console.log(this.values);

  }


  //whenever this component initializes this method is invoked  and after 2 sec loader disappears and 
  // the component's view appears.And when the Preview data appears the toastr also displays.
  public loader() {

    setTimeout(this.openMainPage, 2000);
  }

  public openMainPage() {

    document.getElementById("loader").style.display = "none";
    document.getElementById("preview").style.display = "block";
    document.getElementById("toastr").style.display = "block";

  }

  ngOnInit() {

    //everytime this component initializes then the loader method is invoked 
    this.loader();

    //get the this.input as parsed value from localstorage's defaultinput.
    this.input = JSON.parse(localStorage.getItem('defaultinput'));

    //this method in invoked to get the preview of this.input taken from localstorage,initially whenever the component 
    //loads
    this.initialPreview();


  }

  ngOnDestroy(){
    

    localStorage.setItem('defaultinput', JSON.stringify(this.input));

  }
}
