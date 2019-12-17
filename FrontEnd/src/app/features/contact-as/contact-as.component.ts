import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ContactAsService } from '../features-shared/services/contact-as.service';
import { DataService } from './../../shared/services/data.service';

@Component({
  selector: "app-contact-as",
  templateUrl: "./contact-as.component.html",
  styleUrls: ["./contact-as.component.scss"]
})
export class ContactAsComponent implements OnInit {
  form: FormGroup;
  isDarkMode: boolean;
  constructor(private fb: FormBuilder, private dataService: DataService, private contactAsService: ContactAsService) {
    this.createForm();
  }

  ngOnInit() {
    this.dataService.currentThemeModeState.subscribe(
      themeState => {
        this.isDarkMode = themeState;
      }
    );
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  onSubmit() {
    const { name, email, message } = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    const formRequest = { name, email, message, date, html };
    this.contactAsService.sendMessages(formRequest);
    this.form.reset();
  }
}
