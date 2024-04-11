import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { HandlerService } from 'src/services/handler.service';
import { UtilsService } from 'src/services/utils.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor(private handlerService: HandlerService, private utilsService: UtilsService) { }

  query: string = ""
  displayedColumns: string[] = [];

  ELEMENT_DATA: any[] = [];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async execQuery() {
    this.displayedColumns = []
    this.ELEMENT_DATA = []

    if (this.query == "") {
      this.utilsService.showSweetAlert({ title: "Ops!", icon: "error", message: "Não foi enviado a Query." });
      return
    }
    const url = "{{LINK DO SEU FLUIG}}/api/public/ecm/dataset/datasets"

    const data = {
      "name": "ds_execQuery",
      "fields": [`${this.query}`],
    }

    const returnDs = await this.handlerService.restCall({ url, method: "POST", json: data });

    if(returnDs.content.values.length > 0){
      this.displayedColumns = Object.keys(returnDs.content.values[0])
      this.ELEMENT_DATA = returnDs.content.values
    }

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;

    this.query = ""
    this.utilsService.showSweetAlert({ title: "Sucesso!", icon: "success", message: "Query executada com sucesso." });
  }

  ajustaQuery() {
    this.query = this.query.includes('"') ? this.query.replaceAll('"', "") : this.query;
  }

  gerarRelatorio() {
    const workbook = XLSX.utils.book_new();

    const sheetsSum = XLSX.utils.json_to_sheet(this.ELEMENT_DATA, { cellDates: true })
    XLSX.utils.book_append_sheet(workbook, sheetsSum, 'Resumo dos Dados');

    XLSX.writeFile(workbook, "dados.xlsx", { compression: true });
  }
}