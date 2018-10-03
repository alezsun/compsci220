let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
// 1
function imageMap(img, func){
  let imgCopy = img.copy();
  for(let w = 0; w < img.width; ++w){
    for(let h = 0; h < img.height; ++h){
      imgCopy.setPixel(w, h, func(img, w, h));
    }
  }
  return imgCopy;
}


// 2
function imageMask(img, func, maskValue){
  let imgCopy = img.copy();
  for(let w = 0; w < img.width; ++w){
    for(let h = 0; h < img.height; ++h){
      if(func(img, w, h)){
        imgCopy.setPixel(w, h, maskValue);
      }
    }
  }
  return imgCopy;
}


// 3
function blurPixel(img, w, h){
  let bound = 5;
  let tempW = 0;
  let totalW = 0;
  let rm = 0;
  let gm = 0;
  let bm = 0;
  //default bound will be 5 if the width of the img is greater than 5
  //if the width of the img is lower than 11, than we need to change the value of bound so later the for loop will not run over the size
  if(img.width < 11){
    bound = Math.floor((img.width - 1) / 2);
  }
  //if w is at the beginning or the ending of the few pixle according to the bond we set then when we wanna average the pixels, 
  //we only take that few amount before and after to average 
  if(w < bound){ tempW = w; } 
  else if(w > (img.width - bound - 1)){ tempW = img.width - 1 - w; } 
  else{tempW = bound; }
  totalW = 1 + (tempW * 2);

  for(let i = 0; i < totalW; ++i){
    rm += img.getPixel(w + i - tempW, h)[0];
    gm += img.getPixel(w + i - tempW, h)[1];
    bm += img.getPixel(w + i - tempW, h)[2];
  }
  rm /= (totalW);
  gm /= (totalW);
  bm /= (totalW);
  return [rm, gm, bm];
}


// 4
function blurImage(img){
  let imgCopy = imageMap(img, blurPixel);
  imgCopy = imageMap(img, blurPixel);
  return imgCopy;
}


// 5
function isDark(img, x, y){
  for(let i = 0; i < 3; ++i){
    if(img.getPixel(x,y)[i] >= 0.5){
      return false;
    }
  }
  return true;
}


// 6
function darken(img){
  // let imgCopy = img.copy();
  // imgCopy = imageMap(img, function(image, x, y){
  //   if(isDark(image, x, y)){
  //     return [0,0,0];
  //   }
  //   else{
  //     return image.getPixel(x, y);
  //   }
  // });
  return imageMask(img, isDark, [0,0,0]);
}


// 7
function isLight(img, x, y){
  for(let i = 0; i < 3; ++i){
    if(img.getPixel(x,y)[i] < 0.5){
      return false;
    }
  }
  return true;
}


// 8
function lighten(img){
  // let imgCopy = img.copy();
  // imgCopy = imageMap(img, function(image, x, y){
  //   if(isLight(image, x, y)){
  //     return [1,1,1];
  //   }
  //   else{
  //     return image.getPixel(x, y);
  //   }
  // });
  return imageMask(img, isLight, [1,1,1]);
}


// 9
function lightenAndDarken(img){
  //   let imgCopy = img.copy();
  //   imgCopy = imageMap(img, function(image, x, y){
  //   if(isLight(image, x, y)){
  //     return [1,1,1];
  //   }
  //   else if(isDark(image, x, y)){
  //     return [0,0,0];
  //   }
  //   else{
  //     return image.getPixel(x, y);
  //   }
  // });
  return lighten(darken(img));
}

// imageMap(robot, function(img, x, y) {
//   const c = img.getPixel(x, y);
//   return [c[0], 0, 0];
// }).show();

// imageMask(robot, function(img, x, y) {return (y % 10 === 0);}, [1, 0, 0]).show();

// imageMap(robot, blurPixel).show();

// blurImage(robot).show();

// darken(robot).show();

// lighten(robot).show();

// lightenAndDarken(robot).show();