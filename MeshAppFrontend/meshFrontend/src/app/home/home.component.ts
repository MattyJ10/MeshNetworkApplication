import { Component, OnInit } from '@angular/core';
import { MeshService } from '../mesh.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public data:any; 

  constructor(private meshService: MeshService) { }

  ngOnInit() {
  }

  test() {
  	this.meshService.test().subscribe(
  		res => {
  			this.data = res.data; 
  		}); 
  }

}
