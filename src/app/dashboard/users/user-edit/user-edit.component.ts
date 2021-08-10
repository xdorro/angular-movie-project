import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../shared/interfaces/user';
import {Subject} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, AfterViewInit, OnDestroy {
  visible = false;
  user: User;
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
  ) {
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]]
    });

    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      console.log(params);
      const {userId} = params;
      this.userService.getUserByUserId(userId).subscribe((success) => {
        console.log(success);
        this.user = success.data;

        this.validateForm.patchValue({
          name: this.user.name,
          username: this.user.username
        });
      }, (error) => {
        this.close();
        this.nzMessageService.error(error.error.message);
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => this.router.navigate(['/dashboard', 'users']),
      100
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  submitForm(): void {
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }

    this.userService.updateUserByUserId(this.user.user_id, this.validateForm.value).subscribe((success) => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Cập nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
    });
  }

}
