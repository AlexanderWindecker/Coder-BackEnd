import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "../../src/persistence/fileSystem/item.json";
    this.products = [];
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail
  ) {
    const product = {
      id: this.#idGenerator(),
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail: [],
    };

    const checkCode = this.#codeChecker(code);
    if (checkCode) {
      console.log("Código repetido");
    } else if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !status ||
      !category
    ) {
      console.log("Campo/s no rellenado/s");
    } else {
      product.thumbnail.push(thumbnail);
      this.products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log("Producto agregado correctamente");
    }
  }

  async getProducts() {
    if (fs.existsSync(this.path)) {
      const readInfo = await fs.promises.readFile(this.path, "utf-8");
      const savedInfo = JSON.parse(readInfo);
      return savedInfo;
    } else {
      console.log("Archivo no encontrado");
      return this.products;
    }
  }

  async getProductById(id) {
    const savedInfoId = await this.getProducts();
    const productId = savedInfoId.find((elem) => elem.id === id);
    if (productId !== undefined) {
      return productId;
    } else console.log("Id no encontrado");
  }

  async updateProduct(id, field, value) {
    const prdcToUpdate = await this.getProductById(id);
    if (prdcToUpdate) {
      const savedPrdct = await this.getProducts();
      const indexId = savedPrdct.findIndex((element) => element.id === id);
      savedPrdct[indexId][field] = value;
      await fs.promises.writeFile(this.path, JSON.stringify(savedPrdct));
      console.log("Archivo actualizado correctamente");
    } else {
      console.log("Inserte un ID válido");
    }
  }

  async deleteProduct(id) {
    const prdcToDelete = await this.getProductById(id);
    if (prdcToDelete) {
      const savedPrdct = await this.getProducts();
      const indexId = savedPrdct.findIndex((element) => element.id === id);
      console.log(`El archivo se ha eliminado correctamente`);
      savedPrdct.splice(indexId, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(savedPrdct));
    } else {
      console.log("Archivo no encontrado");
    }
  }

  #idGenerator() {
    let id = 1;
    if (this.products.length !== 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    return id;
  }

  #codeChecker(code) {
    return this.products.find((prod) => prod.code === code);
  }
}
