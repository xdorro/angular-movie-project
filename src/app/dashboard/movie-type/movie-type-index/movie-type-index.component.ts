import {Component, OnInit} from '@angular/core';
import {MovieType} from '@/app/shared/interfaces/movie-type';
import {TableService} from '@/app/shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {MovieTypeService} from '@/app/shared/services/movie-type.service';
import {SharedService} from '@/app/shared/services/shared.service';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';

@Component({
  selector: 'app-movie-type-index',
  templateUrl: './movie-type-index.component.html',
  styleUrls: ['./movie-type-index.component.css']
})
export class MovieTypeIndexComponent implements OnInit {
  mapDefaultStatus = GlobalUtils.mapDefaultStatus;

  searchInput: string | number;
  displayData = [];

  movieTypes: MovieType[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: MovieType, b: MovieType) => a.movie_type_id - b.movie_type_id,
    },
    {
      title: 'Kiểu phim',
      compare: (a: MovieType, b: MovieType) => a.name.localeCompare(b.name)
    },
    {
      title: 'Đường dẫn',
      compare: (a: MovieType, b: MovieType) => a.slug.localeCompare(b.slug)
    },
    {
      title: 'Trạng thái',
      compare: (a: MovieType, b: MovieType) => a.status - b.status,
    },
    {
      title: ''
    }
  ];

  constructor(
    private tableSvc: TableService,
    private nzMessageService: NzMessageService,
    private movieTypeService: MovieTypeService,
    private sharedService: SharedService,
  ) {
    this.sharedService.changeEmitted$.subscribe(() => {
      this.list();
    });
  }

  ngOnInit(): void {
    this.list();
  }

  search(): void {
    const data = this.movieTypes;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  list(): void {
    this.movieTypes = [];

    this.movieTypeService.getAllMovieTypes().subscribe((response) => {
      this.movieTypes = response.data;

      this.displayData = this.movieTypes;
    });
  }

  delete(genreId: number): void {
    this.movieTypeService.deleteMovieTypeByMovieTypeId(genreId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}
