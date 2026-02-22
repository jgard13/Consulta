import { Product } from './producto.model';

describe('Product Interface', () => {

  it('should create a valid product object', () => {

    const product: Product = {
      id: 1,
      name: 'Laptop',
      price: 1200,
      imageUrl: 'https://example.com/laptop.jpg',
      category: 'Electronics',
      description: 'High performance laptop',
      inStock: true
    };

    expect(product).toBeTruthy();
    expect(product.id).toBe(1);
    expect(product.inStock).toBe(true);

  });

});