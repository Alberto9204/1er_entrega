const fs = require("fs");

class Container {
  constructor() {}

  read(file) {
    let all = [];
    try {
      all = fs.readFileSync(file, "utf8");
      all.length > 0 ? (all = JSON.parse(all)) : (all = []);
    } catch (err) {
      console.log("Error en la lectura del archivo", err);
    }
    return all;
  }

  write(allArray, file) {
    let json = JSON.stringify(allArray);
    try {
      fs.writeFileSync(file, json);
    } catch (err) {
      console.log("Error en la escritura", err);
    }
  }



  save(item, file) {
    console.log("Guardando...", item);
    let nextId = this.getNextId(file);
    item.id = nextId;
    const allArray = this.read(file);
    allArray.push(item);
    this.write(allArray, file);
  }

  update(id, item, file) {
    console.log("Actualizando...", item);
    const allArray = this.read(file);
    let index = allArray.findIndex((item) => item.id == id);
    if (index >= 0) {
      item.id = id;
      allArray[index] = item;
      this.write(allArray, file);
    } else {
      console.log("No se encontro el item");
    }
  }

  getNextId(file) {
    let lastId = 0;
    let allArray = this.read(file);
    if (allArray.length > 0) {
      lastId = allArray[allArray.length - 1].id;
    }
    return lastId + 1;
  }

  getById(id, file) {
    let allArray = this.read(file);
    let item = allArray.find((item) => item.id == id);
    return item ? item : null;
  }

  getAll(file) {
    let allArray = this.read(file);
    return allArray;
  }

  deleteById(id, file) {
    let allArray = this.read(file);
    let index = allArray.findIndex((item) => item.id == id);
    if (index >= 0) {
      allArray.splice(index, 1);
      let json = JSON.stringify(allArray);
      try {
        fs.writeFileSync(file, json);
        return id;
      } catch (err) {
        console.log("Error en la escritura", err);
      }
    }
  }


}

module.exports = Container;
