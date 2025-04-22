import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router:Router, private toastr:ToastrService){ }
  userLogout() {
    const isLogOut = confirm('Are you sure want to LOGOUT?');
    if (isLogOut) {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      this.toastr.info('LogOut Successfully!', 'LogOut', {
        positionClass: 'toast-bottom-right',
      });
    }
  }

}
