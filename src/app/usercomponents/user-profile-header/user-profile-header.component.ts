import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ModelOwner, User, UserRole} from "../../domain/models";
import {BASE_url} from "../../app.config";

@Component({
  selector: 'app-user-profile-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.css'
})
export class UserProfileHeaderComponent implements OnInit{

  @Input()
  user: boolean =true;
  constructor(private http: HttpClient) {
  }
  username!: string;
  imageUrl!: string;

  ngOnInit(): void {
    this.loadProfile();

  }

  loadProfile() {
    this.http.get<ModelOwner>(BASE_url+'/sellers/myaccount',{withCredentials:true}).subscribe( {
      next: (data) => {
        this.username = data.displayName;
        this.imageUrl = data.profilePicture;
      },error: (error) => {
        console.log(error);
      }
    });

  }


}
