import { Component, OnInit } from '@angular/core';
import {StorageService} from '../shared/storage.service';
import {RequestService} from '../shared/request.service';
import {GlobalService} from '../shared/global.service';
import {ProjectService} from '../shared/project.service';
import {Router} from '@angular/router';
import {EditProjectService} from '../shared/editProject.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  constructor(private storageService: StorageService,
              private requestsService: RequestService,
              private globalService: GlobalService,
              private projectService: ProjectService,
              private router: Router,
              private editProjectService: EditProjectService) {
  }

  public selectedProject = null;

  public displayAdd = false;
  public displayImport = false;

  public displayEdit = true;

  public collapseAll() {
    this.selectedProject = null;
    this.displayAdd = false;
    this.displayImport = false;
  }

  ionViewDidEnter() {
    this.collapseAll();
    this.projectService.refreshProjects();
  }

  ngOnInit() {
    this.storageService.get('projectCodes', (projectCodes) => {
      this.globalService.projectCodes = projectCodes;
      this.projectService.refreshProjects();
    }, []);
  }

  public delayedRefresh(delay: number) {
    setTimeout(() => {
      this.projectService.refreshProjects();
    }, delay);
  }

  public toggleSelect(project: any) {
    if (this.selectedProject === project) {
      this.selectedProject = null;
    } else {
      this.selectedProject = project;
      this.editProjectService.setProject(project);
    }
  }

  alertCode(code: string) {
    alert(code);
    // May be expanded
  }

  removeProject(project: any) {
    this.projectService.removeProjectCode(project.code);
    this.collapseAll();
  }

  editProject() {
    this.editProjectService.editProject();
    // May be expanded
  }

  openProject(project: any) {
    this.globalService.currentProject = project;
    this.globalService.blocks = [];
    this.globalService.recycleBlocks = [];
    this.router.navigateByUrl('/home');
  }
}
