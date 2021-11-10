import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-manga-form',
  templateUrl: './manga-form.component.html',
  styleUrls: ['./manga-form.component.scss'],
})
export class MangaFormComponent implements OnInit {
  @Output() onSubmitManga: EventEmitter<FormData> = new EventEmitter()
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      author: [''],
      description: [''],
      date: [null],
      status: [''],
      cover: [null]
    })
  }

  ngOnInit() {}

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({
      cover: file
    })
    this.form.get('cover').updateValueAndValidity()
  }

  onSubmit() {
    const formData = new FormData()
    formData.append('name', this.form.get('name').value)
    formData.append('author', this.form.get('author').value)
    formData.append('description', this.form.get('description').value)
    formData.append('date', this.form.get('date').value)
    formData.append('status', this.form.get('status').value)
    formData.append('cover', this.form.get('cover').value)

    this.onSubmitManga.emit(formData)
  }

}
