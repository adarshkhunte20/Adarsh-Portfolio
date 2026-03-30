import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  
  programmingSkills = [
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' }
  ];

  backendSkills = [
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Spring MVC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Hibernate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg' },
    { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Microservices', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' }
  ];

  frontendSkills = [
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' }
  ];

  devopsSkills = [
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
  ];

  toolsSkills = [
    { name: 'Maven', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    { name: 'IntelliJ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' }
  ];

  projects = [
    {
      name: 'POS Billing System',
      description: 'Restaurant point-of-sale system with real-time order management, inventory tracking, and automated billing. Built with Spring Boot microservices and Angular frontend.',
      tech: ['Java', 'Spring Boot', 'Angular', 'MySQL']
    },
    
    {
      name: 'Student Management System',
      description: 'Comprehensive platform for managing students, faculty, academics, attendance, and fees. Features real-time dashboards and reporting system.',
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS']
    }
    
  ];

  contact = { name: '', email: '', message: '' };
  navScrolled = false;
  cursorX = 0;
  cursorY = 0;

  private revealObserver!: IntersectionObserver;
  private mouseMoveHandler: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Only run browser-specific code on the client side
    if (isPlatformBrowser(this.platformId)) {
      this.initBrowserFeatures();
    }
  }

  private initBrowserFeatures(): void {
    // Cursor tracking
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;
    };
    document.addEventListener('mousemove', this.mouseMoveHandler);

    // Scroll reveal animation
    setTimeout(() => {
      this.revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { 
          if (e.isIntersecting) e.target.classList.add('on'); 
        });
      }, { threshold: 0.12 });
      
      document.querySelectorAll('.reveal').forEach(el => this.revealObserver.observe(el));
    }, 300);
  }

  ngOnDestroy(): void {
    // Only clean up if we're in browser environment
    if (isPlatformBrowser(this.platformId)) {
      if (this.mouseMoveHandler) {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
      }
      if (this.revealObserver) {
        this.revealObserver.disconnect();
      }
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.navScrolled = window.scrollY > 60;
    }
  }

  scrollTo(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  viewProject(project: any): void {
    alert(`Opening project: ${project.name}\n\nTech Stack: ${project.tech.join(', ')}`);
  }

  sendMessage(): void {
    if (!this.contact.name || !this.contact.email || !this.contact.message) {
      alert('Please fill all fields.');
      return;
    }
    alert(`Thank you ${this.contact.name}! I'll get back to you soon.`);
    this.contact = { name: '', email: '', message: '' };
  }
}