// Boxmaker

// This script creates notch and tab sides for lasercutting boxes

main();

function main(){
  var boxDoc = app.documents.add(DocumentColorSpace.RGB,1728,864);

  var win = new Window( 'dialog', 'Boxmaker' ); 
  g = win.graphics;
  
  var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
  g.backgroundColor = myBrush;
  win.orientation='stack';
  win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
  win.g1 = win.p1.add('group');
  win.g1.orientation = "row";
  win.title = win.g1.add('statictext',undefined,'Boxmaker');
  win.title.alignment="fill";

  var g = win.title.graphics;
  g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
  
  win.g5 =win.p1.add('group');
  win.g5.orientation = "row";
  win.g5.alignChildren='left';
  win.g5.spacing=10;
  win.stL = win.g5.add('statictext',undefined,'Length (in)');
  win.len = win.g5.add('edittext'); 
  win.len.preferredSize=[80,20];

  win.g10 =win.p1.add('group');
  win.g10.orientation = "row";
  win.g10.alignChildren='left';
  win.g10.spacing=10;
  win.stW = win.g10.add('statictext',undefined,'Width (in)');
  win.wid = win.g10.add('edittext'); 
  win.wid.preferredSize=[80,20];

  win.g15 =win.p1.add('group');
  win.g15.orientation = "row";
  win.g15.alignChildren='left';
  win.g15.spacing=10;
  win.stH = win.g15.add('statictext',undefined,'Height (in)');
  win.hgt = win.g15.add('edittext'); 
  win.hgt.preferredSize=[80,20];

  win.g20 =win.p1.add('group');
  win.g20.orientation = "row";
  win.g20.alignChildren='left';
  win.g20.spacing=10;
  win.stT = win.g20.add('statictext',undefined,'Thickness (in)');
  win.thk = win.g20.add('edittext'); 
  win.thk.preferredSize=[80,20];
  
  win.g100 = win.p1.add('group');
  win.g100.orientation = "row";
  win.g100.alignment='center';
  win.g100.spacing=10;
  win.OkBtn = win.g100.add('button',undefined,'OK');
  win.OkBtn.preferredSize=[120,30];
  win.Cancel = win.g100.add('button',undefined,'Cancel');
  win.Cancel.preferredSize=[120,30];

  win.OkBtn.onClick = function(){ //VALID Button test
    win.close();

    var l,w,h,t,x,y;
    x = 10;
    y = 10;

    l = win.len.text ? parseFloat(win.len.text) * 72 : prompt("Enter a Length: ", 1) * 72;
    w = win.wid.text ? parseFloat(win.wid.text) * 72 : prompt("Enter a Width: ", 1)  * 72;
    h = win.hgt.text ? parseFloat(win.hgt.text) * 72 : prompt("Enter a Height: ", 1)  * 72;
    t = win.thk.text ? parseFloat(win.thk.text) * 72 : prompt("Enter a Thickness: ", 0.125) * 72;

    var boxes = []
    
    boxes.push(createBox(x,y,l,w,t));
    boxes.push(createBox(x*2+l,y,l,w,t));

    boxes.push(createBox(x,y*2+w,l,h,t));
    boxes.push(createBox(x*2+l,y*2+w,l,h,t));

    boxes.push(createBox(x,y*3+w+h,w,h,t));
    boxes.push(createBox(x*2+w,y*3+w+h,w,h,t));
    
    app.activeDocument.selection = boxes;
    return resultBox;
  };
 
  win.show(); // show dialogbox
}

// ---------------------------------------------
function createBox(x,y,l,w,t){
  var path = [];
  var l0,l1,w0,w1,th,tabL,tabW,len,wid;
  l0 = x;
  l1 = x + l;
  w0 = y;
  w1 = y + w;
  
  tabL = ((l/72)/(4*parseInt((l/72))))*72;
  tabW = ((w/72)/(4*parseInt((w/72))))*72;

  path.push([l0,w0]);

  len = l0;
  wid = w0;
  th = t;

  while(wid < w1){
    wid += tabW;
    path.push([len,wid]);
    th *= -1;
    len -= th;
    path.push([len,wid]);
  }
  path.push([len,w1]);

  len = l0;
  wid = w1;
  th = t;

  while(len < l1){
    len += tabL;
    path.push([len,wid]);
    th *= -1;
    wid += th;
    path.push([len,wid]);
  }
  path.push([l1,wid]);

  len = l1;
  wid = w1;
  th = t;

  while(wid > w0){
    wid -= tabW;
    path.push([len,wid]);
    th *= -1;
    len += th;
    path.push([len,wid]);
  }
  path.push([len,w0]);

  len = l1;
  wid = w0;
  th = t;

  while(len > l0){
    len -= tabL;
    path.push([len,wid]);
    th *= -1;
    wid -= th;
    path.push([len,wid]);
  }
  path.push([l0,w0]);

  var box = app.activeDocument.activeLayer.pathItems.add();
  with(box){
    setEntirePath(path);

    // pathstyle
    stroked = true;
    strokeColor = rgbColor(255,0,0);
    strokeWidth = 0.001;
    filled = false;
    closed = true;
  }
  return box;
}

function rgbColor(r,g,b){
  var newRGBColor = new RGBColor();
  newRGBColor.red = r;
  newRGBColor.green = g;
  newRGBColor.blue = b;

  return newRGBColor;
}