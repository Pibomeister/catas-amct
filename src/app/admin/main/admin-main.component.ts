import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpService } from './../../services/http.service';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'cata-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit, OnDestroy {

  catas : Object[] = [];
  user = JSON.parse(this.cookies.get('user'));
  constructor(private socket : SocketService, private httpService : HttpService, private cookies : CookieService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.getCatas();
  }

  ngOnDestroy(){
    // this.connection.unsubscribe();
  }

  refreshList(){
    this.getCatas();
  }

  getCatas(){
    this.httpService.getCatas(this.user.id).subscribe(catas=> this.catas = catas)
  }

  getBackground(status){
    let bgc;
    if(status === 1) bgc = '#d9edf7'
    else if(status === 2) bgc = '#fcf8e3';
    else bgc = "#16a085";
    return {
      'background-color' : bgc
    }
  }

  registerCata(){
    this.router.navigate(['event'], {relativeTo : this.route})
  }

  accessCata(id){
     this.router.navigate(['event', id], {relativeTo:this.route})
  }

  onEdit(id){
    this.router.navigate(['event', id, 'edit'], {relativeTo:this.route});
  }

}
