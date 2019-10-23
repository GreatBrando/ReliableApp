import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService, Idea } from './../idea.service';



@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.page.html',
  styleUrls: ['./viewdetails.page.scss'],
})
export class ViewdetailsPage implements OnInit {

 idea: Idea = {
    jobTitle: '',
    companyName: '',
    jobAddress: '',
    jobCity: '',
    jobState: '',
    jobPosition: '',
    jobDescription: '',
    minSalary: undefined,
    maxSalary: undefined
  };

  constructor(private activatedRoute: ActivatedRoute, private ideaService: IdeaService) { }

  ngOnInit() {
      
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  }

}
