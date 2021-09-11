import AppError from "../../../shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productAlreadyExists = await productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('There is already on product with this name')
    }

    const product = productRepository.create({
      name,
      price,
      quantity
    })

    await productRepository.save(product);

    return product;

  }
}

export default CreateProductService;
