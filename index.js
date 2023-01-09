class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  getAddId = () => {
    const count = this.products.length;
    const addtId = count > 0 ? this.products[count - 1].id + 1 : 1;
    return addtId;
  };

  getProductById(id) {
    if (this.products.find((p) => p.id === id)) {
      return this.products.find((p) => p.id === id);
    } else {
      return "Not found";
    }
  }

  addProduct(product) {
    if (!this.products.find((p) => p.code === product.code)) {
      product["id"] = this.getAddId();
      this.products.push(product);
    }
  }
}

