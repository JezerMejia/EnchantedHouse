document.addEventListener("DOMContentLoaded", () => {
  const thunderbolt = document.querySelector("#thunderbolt");
  const thunderSound = document.querySelector("#thunderSound");
  const sky = document.querySelector("#sky");
  const ghostEntity = document.querySelector("#ghostEntity");
  const daniEntity = document.querySelector("#daniEntity");

  setInterval(() => {
    thunderbolt.emit("startanim", null, false);
    thunderbolt.emit("popanim", null, false);
    thunderbolt.emit("endanim", null, false);

    sky.emit("startanim", null, false);
    sky.emit("endanim", null, false);

    thunderSound.components.sound.playSound();
  }, 15000);

  setInterval(() => {
    ghostEntity.emit("startanim", null, false);
    ghostEntity.emit("endanim", null, false);

    daniEntity.emit("startanim", null, false);
    daniEntity.emit("endanim", null, false);
  }, 30000);
});

AFRAME.registerComponent("model-relative-opacity", {
  schema: { default: 1.0, type: "number" },
  init: function () {
    this.nodeMap = {};
    this.prepareMap.bind(this);
    this.traverseMesh.bind(this);

    this.el.addEventListener("model-loaded", (e) => {
      this.prepareMap();
      this.update();
    });
  },
  prepareMap: function () {
    this.traverseMesh((node) => {
      this.nodeMap[node.uuid] = node.material.opacity;
    });
  },
  update: function () {
    this.traverseMesh((node) => {
      node.material.opacity = this.nodeMap[node.uuid] * this.data;
      node.material.transparent = node.material.opacity < 1.0;
      node.material.needsUpdate = true;
    });
  },
  remove: function () {
    this.traverseMesh((node) => {
      node.material.opacity = this.nodeMap[node.uuid];
      node.material.transparent = node.material.opacity < 1.0;
      node.material.needsUpdate = true;
    });
  },
  traverseMesh: function (func) {
    var mesh = this.el.getObject3D("mesh");
    if (!mesh) {
      return;
    }
    mesh.traverse((node) => {
      if (node.isMesh) {
        func(node);
      }
    });
  },
});
