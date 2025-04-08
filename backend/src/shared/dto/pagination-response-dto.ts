export class PaginationResponseDto<T> {
  public page: number;
  public pages: number;
  public size: number;
  public total: number;
  public nextPage: number | null;
  public prevPage: number | null;
  public data: Array<T> | [];

  constructor(page: number, size: number, total: number, data: Array<T> | []) {
    this.page = page;
    this.size = size;
    this.total = total;
    this.data = data;
    this.pages = Math.ceil(total / size);
    this.prevPage = page <= 1 ? null : page - 1;
    this.nextPage = page >= this.pages ? null : page + 1;
  }
}
