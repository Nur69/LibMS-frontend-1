import {
  IsDate,
  IsISBN,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class Book {
  @IsISBN()
  isbn: string;

  @IsString()
  title: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  originalTitle?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsNumber()
  @Min(1)
  pageCount: number;

  @IsString()
  publisher: string;

  @IsDate()
  publicationDate: Date;
}
