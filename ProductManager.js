const fs = "fs";

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

export default class ProductManager {
  constructor(path) {
    this.path = [];
  }

  async addProdruct(product) {
    try {
      const productsFile = await this.getProducts();
      productsFile.push(product);
      await fs.promises.writeFile(path, JSON.stringify(productsFile));
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
    return this.path;
  }

  deletFileProducts(parameter) {
    if (parameter === "si") {
      fs.unlinkSync(path);
    }
  }

  getProducts() {
    return this.path;
  }

  getAddId = () => {
    const count = this.path.length;
    const addtId = count > 0 ? this.path[count - 1].id + 1 : 1;
    return addtId;
  };

  getProductById(id) {
    if (this.path.find((p) => p.id === id)) {
      return this.path.find((p) => p.id === id);
    } else {
      return "Not found";
    }
  }

  addProduct(product) {
    if (!this.path.find((p) => p.code === product.code)) {
      product["id"] = this.getAddId();
      this.products.push(product);
    }
  }

  updateProduct(id, title) {
    const actualizar = this.path.find((prop) => prop.id === id);
    return (actualizar.title = title);
  }

  deleteProduct(id) {
    return this.path.filter((elemente) => elemente.id !== id);
  }
}
