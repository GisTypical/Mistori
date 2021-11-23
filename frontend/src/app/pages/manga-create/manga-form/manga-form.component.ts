import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Manga } from 'src/app/shared/Manga';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-manga-form',
  templateUrl: './manga-form.component.html',
  styleUrls: ['./manga-form.component.scss'],
})
export class MangaFormComponent implements OnInit {
  @Output() onSubmitManga: EventEmitter<FormData> = new EventEmitter();
  form: FormGroup;
  alert: HTMLIonAlertElement

  constructor(private fb: FormBuilder, private alertController: AlertController) {
    this.form = this.fb.group({
      name: [''],
      author: [''],
      description: [''],
      date: [null],
      status: [''],
      cover: [null],
    });
  }

  ngOnInit() {}

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file.size > 4194304) {
      this.alertLoading('File size too large', 'Insert a file not larger than 4MB')
      .then(alertEl => {this.form.get('cover').setValue(null)})
    }
    this.form.patchValue({ cover: file });
    this.form.get('cover').updateValueAndValidity();
  }

  onInput() {
    const nameDis = this.form.get('name').value == undefined || this.form.get('name').value == '' ? true : false
    const authorDis = this.form.get('author').value == undefined || this.form.get('author').value == '' ? true : false
    const descriptionDis = this.form.get('description').value == undefined || this.form.get('description').value == '' ? true : false
    const dateDis = this.form.get('date').value == undefined || this.form.get('date').value == '' ? true : false
    const statusDis = this.form.get('status').value == undefined || this.form.get('status').value == '' ? true : false
    const coverDis = this.form.get('cover').value == undefined || this.form.get('cover').value == '' ? true : false

    const validation = nameDis || authorDis || descriptionDis || dateDis || statusDis || coverDis ? true : false

    return validation
  }

  onSubmit() {
    const formData = new FormData();
      formData.append('name', this.form.get('name').value);
      formData.append('author', this.form.get('author').value);
      formData.append('description', this.form.get('description').value);
      formData.append('date', this.form.get('date').value);
      formData.append('status', this.form.get('status').value);
      formData.append('cover', this.form.get('cover').value);

      this.onSubmitManga.emit(formData);
      this.form.get('name').setValue('')
      this.form.get('author').setValue('')
      this.form.get('description').setValue('')
      this.form.get('date').setValue(null)
      this.form.get('status').setValue('')
      this.form.get('cover').setValue(null)
  }

  async alertLoading(header: string, message: string) {
    this.alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    })
    return this.alert.present()
  }
}
