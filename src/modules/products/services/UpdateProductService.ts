import AppError from "../../../shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({ id });

    if (!product) {
      throw new AppError('Product not found!', 404)
    }

    const productNameAlreadyExists = await productRepository.findByName(name);

    if (productNameAlreadyExists) {
      throw new AppError('There is already on product with this name')
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
