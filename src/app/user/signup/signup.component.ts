import { Component, OnInit} from '@angular/core'
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public email: any;
  public password: any;
  public authToken: string = Cookie.get('authToken');
  public activeUser: string = Cookie.get('activeUser');


  constructor(  
    public appService: AppService,
    public router: Router,
    private toastr:  ToastrService)  {}
  ngOnInit() {
  }

  public goToLogIn: any = () => {

    this.router.navigate(['login']);

  } // end goToSignIn

  public signupFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warning('enter first name')
     

    } else if (!this.lastName) {
      this.toastr.warning('enter last name')

    }
       else if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {
      this.toastr.warning('enter password')
     

    } 
else {

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup successful');

            setTimeout(() => {

              this.goToLogIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('some error occured');

        });

    } // end condition

  } // end signupFunction

  
  //log out
  public logout(): void {
    this.appService.logout()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          Cookie.delete('authToken');
          Cookie.delete('activeUser');
          this.router.navigate(['']);
          this.toastr.info("You have been logged out");
        } else {
          Cookie.deleteAll();
          this.toastr.error(apiResponse.message);
        }
      }, (err) => {
        Cookie.deleteAll();
        this.toastr.error('some error occured');
      });
  }

}
