import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Errors } from '../models/errors.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from './services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface AuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
  username?: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './auth.component.html'
})
export default class AuthComponent implements OnInit {
  authType: "login" | "register" = "login";
  title = "";
  errors: Errors = { errors: { } };
  isSubmitting = false;
  authForm: FormGroup<AuthForm>;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ){
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true
      })
    });
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path as "login" | "register";
    this.title = this.authType === "login" ? "Sign In" : "Sign Up";
    if (this.authType === "register"){
      this.authForm.addControl("username", new FormControl("", {
        validators: [Validators.required],
        nonNullable: true
      }));
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };
    let formValues = this.authForm.value;

    let Observable = this.authType === "login" ? this.userService.login(formValues as { email: string, password: string })
      : this.userService.registration({email: formValues.email!, password: formValues.password!, username: formValues.username!});

    Observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => void this.router.navigate(["/"]),
      error: (err) => {
        this.errors = err;
        this.isSubmitting = false;
      },
    });
  }

}
