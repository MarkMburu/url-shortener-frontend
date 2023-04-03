import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  form: FormGroup;
  response: string;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)]]
    });
  }

  onSubmit() {
    const url = this.form.value.url;
    this.http.post('http://localhost:8080/shorten', {fullUrl : url }).subscribe(
      (response: any) => {
        this.response = response.shortUrl;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}