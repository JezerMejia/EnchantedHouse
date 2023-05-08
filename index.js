document.addEventListener("DOMContentLoaded", () => {
  const thunderbolt = document.querySelector("#thunderbolt");
  const thunderSound = document.querySelector("#thunderSound");
  const sky = document.querySelector("#sky");

  setInterval(() => {
    thunderbolt.emit("startanim", null, false);
    thunderbolt.emit("popanim", null, false);
    thunderbolt.emit("endanim", null, false);

    sky.emit("startanim", null, false);
    sky.emit("endanim", null, false);

    thunderSound.components.sound.playSound();
  }, 15000);
});
