import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  showSweetAlert({ title, message, icon = 'success' }: { title: string, message: string, icon?: 'success' | 'error' | 'warning' | 'info' }) {
    return Swal.fire({
      title: title,
      html: message,
      icon: icon,
      showCloseButton: true,
    });
  }
}
