const canvasFun = (id) => {
  return new fabric.Canvas("canvas");
};

let imgWidth, imgHeight
const canvas = canvasFun("canvas");
const inputImage = document.getElementById('myImage');


const addImg = (e) => {
    const file = inputImage.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
        // console.log(reader.result)
        fabric.Image.fromURL(reader.result, img => {
            canvas.setBackgroundImage(img, function() {
                canvas.requestRenderAll();
                imgWidth = img.width * img.scaleX;
                imgHeight = img.height * img.scaleY;
                }, {
                   scaleX: canvas.width / img.width,
                   scaleY: canvas.height / img.height
                });
    })
})
}

inputImage.addEventListener('change', addImg)

canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom = zoom + delta/200;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    var vpt = this.viewportTransform;
    if (vpt[4] >= 0) {
      this.viewportTransform[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - imgWidth * zoom) {
      this.viewportTransform[4] = canvas.getWidth() - imgWidth * zoom;
    }
    if (vpt[5] >= 0) {
      this.viewportTransform[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - imgHeight * zoom) {
      this.viewportTransform[5] = canvas.getHeight() - imgHeight * zoom;
    }
    });

canvas.requestRenderAll();

// const setBackground = (url, canvas) => {
//   fabric.Image.fromURL(url, (img) => {
//     canvas.backgroundImage = img;
//   });
// };


// setBackground(
//   "https://media.istockphoto.com/vectors/abstract-blurred-colorful-background-vector-id1248542684?k=20&m=1248542684&s=612x612&w=0&h=1yKiRrtPhiqUJXS_yJDwMGVHVkYRk2pJX4PG3TT4ZYM=",
//   canvas
// );

