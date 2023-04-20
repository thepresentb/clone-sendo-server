import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryDetailService, CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { Category } from '../../Schemas/category.schema';
import { CreateCategoryDetailDto } from './dto/createCategoryDetail.dto';
import { CategoryDetail } from 'src/Schemas/categoryDetails.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne({ _id: id });
  }
}

@Controller('categoryDetails')
export class CategoryDetailController {
  constructor(private readonly categoryDetailService: CategoryDetailService) {}

  @Post()
  async create(
    @Body() createCategoryDetailDto: CreateCategoryDetailDto,
  ): Promise<CategoryDetail> {
    console.log('create category', createCategoryDetailDto);
    return await this.categoryDetailService.create(createCategoryDetailDto);
  }

  @Get()
  async findAll(): Promise<CategoryDetail[]> {
    return await this.categoryDetailService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Category> {
    return await this.categoryDetailService.findOne({ _id: id });
  }

  @Get('categoryId/:categoryId')
  async findOneByCategoryId(
    @Param('categoryId') categoryId: string,
  ): Promise<Category[]> {
    return await this.categoryDetailService.find({ categoryId });
  }
}
