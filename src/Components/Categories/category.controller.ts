import { ResponseBuilder } from './../../Utils/ResponseBuilder';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryDetailService, CategoryService } from './category.service';
import { Category } from './Schemas/category.schema';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { CategoryDetail } from 'src/Components/Categories/Schemas/categoryDetails.schema';
import mongoose from 'mongoose';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryDetailService: CategoryDetailService,
  ) {}

  @Get()
  async findAll(): Promise<ResponsePayload> {
    try {
      const result: { category: Category; detail: CategoryDetail[] }[] = [];
      const categoryList = await this.categoryService.findAll();
      for (let i = 0; i < categoryList.length; i++) {
        const categoryDetailList = await this.categoryDetailService.find({
          categoryId: categoryList[i]._id,
        });
        result.push({
          category: categoryList[i],
          detail: categoryDetailList,
        });
      }
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: mongoose.Types.ObjectId,
  // ): Promise<ResponsePayload> {
  //   try {
  //     const result: Category = await this.categoryService.findOne({ _id: id });
  //     return new ResponseBuilder(result).build();
  //   } catch (err) {
  //     return new ResponseBuilder()
  //       .withCode(ResponseCodeEnum.BAD_REQUEST)
  //       .withMessage(err.message)
  //       .build();
  //   }
  // }

  // @Post()
  // async create(
  //   @Body() createCategoryDto: CreateCategoryDto,
  // ): Promise<ResponsePayload> {
  //   try {
  //     const result: Category = await this.categoryService.create(
  //       createCategoryDto,
  //     );
  //     return new ResponseBuilder(result).build();
  //   } catch (err) {
  //     return new ResponseBuilder()
  //       .withCode(ResponseCodeEnum.BAD_REQUEST)
  //       .withMessage(err.message)
  //       .build();
  //   }
  // }
}

// @Controller('categoryDetails')
// export class CategoryDetailController {
//   constructor(private readonly categoryDetailService: CategoryDetailService) {}

//   @Post()
//   async create(
//     @Body() createCategoryDetailDto: CreateCategoryDetailDto,
//   ): Promise<ResponsePayload> {
//     try {
//       const result = await this.categoryDetailService.create(
//         createCategoryDetailDto,
//       );
//       return new ResponseBuilder(result).build();
//     } catch (err) {
//       return new ResponseBuilder()
//         .withCode(ResponseCodeEnum.BAD_REQUEST)
//         .withMessage(err.message)
//         .build();
//     }
//   }

//   @Get()
//   async findAll(@Query() query: any): Promise<ResponsePayload> {
//     try {
//       let result;
//       if (query) {
//         result = await this.categoryDetailService.find(query);
//         return new ResponseBuilder(result).build();
//       }
//       result = await this.categoryDetailService.findAll();
//       return new ResponseBuilder(result).build();
//     } catch (err) {
//       return new ResponseBuilder()
//         .withCode(ResponseCodeEnum.BAD_REQUEST)
//         .withMessage(err.message)
//         .build();
//     }
//   }

//   @Get(':id')
//   async findOneById(@Param('id') id: string): Promise<ResponsePayload> {
//     try {
//       const result = await this.categoryDetailService.findOne({ _id: id });
//       return new ResponseBuilder(result).build();
//     } catch (err) {
//       return new ResponseBuilder()
//         .withCode(ResponseCodeEnum.BAD_REQUEST)
//         .withMessage(err.message)
//         .build();
//     }
//   }
// }
