class DotFactory {
  constructor({scene, Babylon}) {
    this.scene = scene;
    this.Babylon = Babylon;

    this.material = new Babylon.StandardMaterial("material", scene);
    this.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
  }

  create(index) {
    const shape = new this.Babylon.MeshBuilder.CreateSphere(
      "d" + index,
      { diameter: 0.1 },
      scene
    );
    shape.material = this.material;
    shape.position = new this.Babylon.Vector3(0,0,0);
    return shape;
  }

}