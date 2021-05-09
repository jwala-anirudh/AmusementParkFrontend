import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.css']
})
export class UserorderComponent implements OnInit {

  displayedTicketColumns: string[] = [
    'ticket id',
    'date',
    'bill'
  ];

  dataSourceTicket = new MatTableDataSource<Ticket>();

  @ViewChild('MatPaginator3') ticketPaginator: MatPaginator;

  
  ticketToSearch: number;
  filteredTickets: Ticket[];

  constructor(
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadAllTickets();
  }

  loadAllTickets() {
    return this.ticketService.GetAllTickets().subscribe((data: any) => {
      this.dataSourceTicket = new MatTableDataSource<Ticket>(data);
      this.dataSourceTicket.paginator = this.ticketPaginator;
    });
  }


  performFilterOnTickets() {
    if (this.ticketToSearch) {
      this.filteredTickets = this.dataSourceTicket.data.filter(
        (ticket: Ticket) => {
          return ticket.ticketId
            .toString(this.ticketToSearch);
        }
      );

      this.dataSourceTicket = new MatTableDataSource<Ticket>(
        this.filteredTickets
      );
    } else {
      this.loadAllTickets();
    }
  }

}
